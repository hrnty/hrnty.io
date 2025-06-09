// script.js

// ゲームごとのYaw値（キー名がアイコン画像ファイル名と一致）
const yawValues = {
  apex: 0.022,
  BattleBitRemastered: 0.00050,
  Battlefield2042: 0.00275,
  Battlefield1: 0.0056,
  Battlefield4: 0.0056,
  Battlefieldv: 0.0056,
  CounterStrike2: 0.022,
  CallofDutyBO3: 0.02108,
  CallofDutyBO4: 0.006594,
  CallofDutyBO6: 0.006598,
  CallofDutyBOCW: 0.006594,
  CallofDutyModernWarfareII: 0.006594,
  CallofDutyVanguard: 0.006594,
  CallofDutyWarzone: 0.006594,
  Cyberpunk2077: 0.01,
  Deadlock: 0.04405,
  DeltaForce: 0.01,
  Destiny2: 0.0066,
  EscapefromTarkov: 0.1249,
  FragPunk: 0.0555,
  Fortnite: 0.5715,
  GTA5: 0.022,
  HaloInfinite: 0.02062,
  Krunker: 0.1375,
  MarvelRivals: 0.0175,
  osu: 0.07958,
  valorant: 0.07,
  overwatch2: 0.0066,
  Paladins: 0.009155,
  PUBG: 2.22222,
  StarWarsBattlefront2: 1.84,
  Strinova: 0.0138888,
  TeamFortress2: 0.022,
  THEFINALS: 0.000980,
  RainbowSixSiege: 0.00572989,
  XDefiant: 0.001782
};

// 要素参照
const dpiInput        = document.getElementById('dpi');
const sensInput       = document.getElementById('sensitivity1');
const resultContainer = document.getElementById('result');

// 選択値保持
let selectedGame1 = null;
let selectedGame2 = null;

// ドロップダウン初期化
function initCustomSelect(id, onChange) {
  const select   = document.getElementById(id);
  const selected = select.querySelector('.selected-item');
  const options  = select.querySelector('.options');
  const label    = selected.querySelector('.label');
  const icon     = selected.querySelector('.icon');

  selected.addEventListener('click', () => {
    select.classList.toggle('open');
  });

  options.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    const value   = li.dataset.value;
    const iconSrc = `images/${yawValues}.jpg`;
    label.textContent = li.querySelector('.label').textContent;
    icon.src          = iconSrc;
    select.classList.remove('open');
    onChange(value);
  });

  document.addEventListener('click', e => {
    if (!select.contains(e.target)) {
      select.classList.remove('open');
    }
  });
}

// 選択肢生成
function populateOptions(id) {
  const select  = document.getElementById(id);
  const options = select.querySelector('.options');
  options.innerHTML = '';
  Object.keys(yawValues).forEach(key => {
    const li = document.createElement('li');
    li.dataset.value = key;
    li.innerHTML     = `<img src="images/${key}.jpg" class="icon"><span class="label">${key}</span>`;
    options.appendChild(li);
  });
}

// 感度計算
function calculateSensitivity() {
  const dpi   = parseFloat(dpiInput.value);
  const sens1 = parseFloat(sensInput.value);
  if (!dpi || !sens1 || !selectedGame1 || !selectedGame2) return;

  const yaw1 = yawValues[selectedGame1];
  const yaw2 = yawValues[selectedGame2];

  // 360°移動距離(cm)
  const distance360 = (360 * 2.54) / (dpi * yaw1 * sens1);

  // 各DPIでの変換感度
  const dpis = [400, 800, 1600, dpi];
  const results = dpis.map(d => {
    const sens2 = (360 * 2.54) / (d * yaw2 * distance360);
    return {
      dpi:   d,
      sens:  sens2.toFixed(2),
      d360:  distance360.toFixed(2),
      d180:  (distance360 / 2).toFixed(2)
    };
  });

  // 結果表示
  let html = `<table>
    <tr><th>DPI</th><th>360°/cm</th><th>180°/cm</th><th>変換感度</th><th>Copy</th></tr>`;
  results.forEach(r => {
    html += `<tr>
      <td>${r.dpi}</td>
      <td>${r.d360}</td>
      <td>${r.d180}</td>
      <td>${r.sens}</td>
      <td><button onclick="copyToClipboard('${r.sens}')">Copy</button></td>
    </tr>`;
  });
  html += `</table>`;
  resultContainer.innerHTML = html;
}

// コピー
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  ['game1-select', 'game2-select'].forEach(id => populateOptions(id));
  initCustomSelect('game1-select', v => { selectedGame1 = v; calculateSensitivity(); });
  initCustomSelect('game2-select', v => { selectedGame2 = v; calculateSensitivity(); });
  dpiInput.addEventListener('input', calculateSensitivity);
  sensInput.addEventListener('input', calculateSensitivity);
});
