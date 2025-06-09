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

// 要素参照（存在しないときはエラーを投げる）
const dpiInput        = document.getElementById('dpi');
const sensInput       = document.getElementById('sensitivity1');
const resultContainer = document.getElementById('result');
if (!dpiInput || !sensInput || !resultContainer) {
  console.error('要素の取得に失敗しました。ID を再確認してください。');
}

// 選択値保持
let selectedGame1 = null;
let selectedGame2 = null;

/**
 * カスタムセレクト（開閉＋選択）をまとめて設定
 */
function setupCustomSelect(id, onChange) {
  const select  = document.getElementById(id);
  if (!select) {
    console.error(`setupCustomSelect: 要素 #${id} が見つかりません`);
    return;
  }
  const trigger    = select.querySelector('.selected-item');
  const options    = select.querySelector('.options');
  const labelEl    = trigger.querySelector('.label');
  const iconEl     = trigger.querySelector('.icon');

  // 開閉トグル
  trigger.addEventListener('click', () => select.classList.toggle('open'));

  // 選択肢を生成
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

  // 選択処理
  options.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    const key = li.dataset.value;
    selectedGame1 = id === 'game1-select' ? key : selectedGame1;
    selectedGame2 = id === 'game2-select' ? key : selectedGame2;

    labelEl.textContent = key;
    iconEl.src          = `images/${key}.jpg`;
    iconEl.alt          = `${key} icon`;
    select.classList.remove('open');
    console.log(`選択: ${id} = ${key}`);
    onChange(key);
  });

  // 外部クリックで閉じる
  document.addEventListener('click', e => {
    if (!select.contains(e.target)) select.classList.remove('open');
  });
}

/**
 * 感度計算ロジック
 */
function calculateSensitivity() {
  const dpi   = parseFloat(dpiInput.value);
  const sens1 = parseFloat(sensInput.value);
  console.log('calculateSensitivity:', { selectedGame1, selectedGame2, dpi, sens1 });

  if (!dpi || !sens1 || !selectedGame1 || !selectedGame2) {
    console.warn('計算条件が揃っていません');
    return;
  }

  const yaw1 = yawValues[selectedGame1];
  const yaw2 = yawValues[selectedGame2];
  const distance360 = (360 * 2.54) / (dpi * yaw1 * sens1);
  const dpis = [400, 800, 1600, dpi];

  const results = dpis.map(d => {
    const sens2 = (360 * 2.54) / (d * yaw2 * distance360);
    return {
      dpi:  d,
      sens: sens2.toFixed(2),
      d360: distance360.toFixed(2),
      d180: (distance360 / 2).toFixed(2)
    };
  });

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

/**
 * クリップボードへコピー
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  setupCustomSelect('game1-select', () => calculateSensitivity());
  setupCustomSelect('game2-select', () => calculateSensitivity());
  dpiInput.addEventListener('input', calculateSensitivity);
  sensInput.addEventListener('input', calculateSensitivity);
});
