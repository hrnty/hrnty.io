// ゲームごとのYaw値
const yawValues = {
    valorant: 0.07,
    overwatch: 0.0066,
    apex: 0.022,
    Battlefield1: 0.0056,
    Battlefield2024: 0.0146,
    Battlefield4: 0.0056,
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
        resultContainer.innerHTML = '正しいDPIおよびSensitivityを入力してください。';
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
    resultContainer.innerHTML = `
                           <h3>計算結果</h3>
           <table>
            <thead>
                <tr>
                    <th>DPI</th>
                    <th>360°距離 (cm)</th>
                    <th>180°距離 (cm)</th>
                    <th>変換後の感度</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                ${results
            .map(
                ({ currentDPI, distance360, distance180, sensitivity2 }) =>
                    `<tr>
                                <td>${currentDPI}</td>
                                <td>${distance360.toFixed(2)}</td>
                                <td>${distance180.toFixed(2)}</td>
                                <td>${sensitivity2.toFixed(2)}</td>
                                <td>
                                    <button onclick="copyToClipboard('${sensitivity2.toFixed(2)}', this)">コピー</button>
                                </td>
                            </tr>`
            )
            .join('')}
            </tbody>
    </table>
    `;
}

function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        // コピーしたテキストをボタンのテキストに変更
        buttonElement.textContent = 'コピーしました！';

        // 1秒後に元のテキストに戻す
        setTimeout(() => {
            buttonElement.textContent = 'コピー';
        }, 1000);
    });
}

// イベントリスナーを登録
dpiInput.addEventListener('input', calculateSensitivity);
sensitivity1Input.addEventListener('input', calculateSensitivity);
game1Select.addEventListener('change', calculateSensitivity);
game2Select.addEventListener('change', calculateSensitivity);
