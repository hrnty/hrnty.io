// script.js

// 各ゲームのYaw値（キー名がアイコン画像ファイル名と一致）
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

/**
 * カスタムセレクト（開閉＋選択）をまとめて設定
 * @param {string} id         - select要素のID (e.g. "game1-select")
 * @param {Function} onChange - 選択時に呼ぶコールバック
 */
function setupCustomSelect(id, onChange) {
  const select  = document.getElementById(id);
  const trigger = select.querySelector('.selected-item');
  const options = select.querySelector('.options');
  const labelEl = trigger.querySelector('.label');
  const iconEl  = trigger.querySelector('.icon');

  // 1) 選択肢を生成（最初に）
  options.innerHTML = '';
  Object.keys(yawValues).forEach(key => {
    const li = document.createElement('li');
    li.dataset.value = key;
    li.innerHTML = `
      <img src="images/${key}.jpg" class="icon">
      <span class="label">${key}</span>
    `;
    options.appendChild(li);
  });

  // 2) トリガーをクリック → 開閉
  trigger.addEventListener('click', () => {
    select.classList.toggle('open');
  });

  // 3) リスト内クリック → 選択＆閉じる
  options.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    const key = li.dataset.value;

    labelEl.textContent = key;
    iconEl.src          = `images/${key}.jpg`;
    iconEl.alt          = `${key} icon`;

    select.classList.remove('open');
    onChange(key);
  });

  // 4) ドキュメントクリック → 外なら閉じる
  document.addEventListener('click', e => {
    if (!select.contains(e.target)) {
      select.classList.remove('open');
    }
  });
}

/**
 * 感度計算ロジック
 */
function calculateSensitivity() {
  const dpi   = parseFloat(dpiInput.value);
  const sens1 = parseFloat(sensInput.value);
  if (!dpi || !sens1 || !selectedGame1 || !selectedGame2) return;

  const yaw1 = yawValues[selectedGame1];
  const yaw2 = yawValues[selectedGame2];
  const distance360 = (360 * 2.54) / (dpi * yaw1 * sens1);
  const dpis = [400, 800, 1600, dpi];

  let html = `<table>
    <tr><th>DPI</th><th>360°/cm</th><th>180°/cm</th><th>変換感度</th><th>Copy</th></tr>`;

  dpis.forEach(d => {
    const sens2 = (360 * 2.54) / (d * yaw2 * distance360);
    const s = sens2.toFixed(2);
    html += `<tr>
      <td>${d}</td>
      <td>${distance360.toFixed(2)}</td>
      <td>${(distance360/2).toFixed(2)}</td>
      <td>${s}</td>
      <td><button onclick="copyToClipboard(this,'${s}')">Copy</button></td>
    </tr>`;
  });

  html += `</table>`;
  resultContainer.innerHTML = html;
}

/**
 * クリップボードへコピーし、ボタンを一時変更
 */
function copyToClipboard(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(() => btn.textContent = orig, 1000);
  });
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  setupCustomSelect('game1-select', value => {
    selectedGame1 = value;
    calculateSensitivity();
  });
  setupCustomSelect('game2-select', value => {
    selectedGame2 = value;
    calculateSensitivity();
  });

  dpiInput.addEventListener('input', calculateSensitivity);
  sensInput.addEventListener('input', calculateSensitivity);
});
