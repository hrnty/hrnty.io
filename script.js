
﻿// ゲームごとのYaw値
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
    XDefiant: 0.001782,
};

// 入力項目の参照
const dpiInput = document.getElementById('dpi');
const sensitivity1Input = document.getElementById('sensitivity1');
const game1Select = document.getElementById('game1');
const game2Select = document.getElementById('game2');
const resultContainer = document.getElementById('result');

// 計算関数
function calculateSensitivity() {
    const dpi = parseFloat(dpiInput.value);
    const sensitivity1 = parseFloat(sensitivity1Input.value);
    const game1 = game1Select.value;
    const game2 = game2Select.value;

    const yaw1 = yawValues[game1];
    const yaw2 = yawValues[game2];

    // 入力チェック
    if (isNaN(dpi) || isNaN(sensitivity1) || dpi <= 0 || sensitivity1 <= 0) {
        resultContainer.innerHTML = 'Please enter the correct DPI and Sensitivity';
        return;
    }

    // 360°距離と感度を計算する関数
    function calculateForDPI(currentDPI) {
        const distance360 = (360 * 2.54) / (dpi * yaw1 * sensitivity1); // 入力されたDPIでの360°距離
        const distance180 = distance360 / 2; // 180°距離
        const sensitivity2 = (360 * 2.54) / (currentDPI * yaw2 * distance360); // 変換後の感度
        return { currentDPI, distance360, distance180, sensitivity2 };
    }

    // 入力DPIおよび固定DPI値で計算
    const results = [
        calculateForDPI(dpi),   // 入力DPI
        calculateForDPI(400),   // DPI 400
        calculateForDPI(800),   // DPI 800
        calculateForDPI(1600),  // DPI 1600
    ];

    // 結果を表形式で表示
   // 変更前（例）
// resultContainer.innerHTML = 'Converted sensitivity: Not yet calculated';

 resultContainer.innerHTML = `
        <h3>Results</h3>
        <table>
            <thead>
                <tr>
                    <th>DPI</th>
                    <th>360°(cm)</th>
                    <th>180°(cm)</th>
                    <th>Converted Sensitivity</th>
                    <th>Copy buttons</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(({ currentDPI, distance360, distance180, sensitivity2 }) => `
                    <tr>
                        <td>${currentDPI}</td>
                        <td>${distance360.toFixed(2)}</td>
                        <td>${distance180.toFixed(2)}</td>
                        <td>${sensitivity2.toFixed(5)}</td>
                        <td>
                            <button onclick="copyToClipboard('${sensitivity2.toFixed(5)}', this)">Copy</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        // コピーしたテキストをボタンのテキストに変更
        buttonElement.textContent = 'Copied！';

        // 3秒後に元のテキストに戻す
        setTimeout(() => {
            buttonElement.textContent = 'Copy';
        }, 3000);
    });
}
// イベントリスナーを登録
dpiInput.addEventListener('input', calculateSensitivity);
sensitivity1Input.addEventListener('input', calculateSensitivity);
game1Select.addEventListener('change', calculateSensitivity);
game2Select.addEventListener('change', calculateSensitivity);


