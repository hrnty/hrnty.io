<!DOCTYPE html>
<html lang="ja" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="google-site-verification" content="GdE0WykVT69CrztMIYgLZ4q6xL0WCjBXyEoG6tCoupw" />
    <meta name="google-adsense-account" content="ca-pub-9594985227278090">
    <meta charset="utf-8" />
    <meta name="FPS Sensitivity Converter Calculator="FPS Sensitivity Converter Calculator and　Introducing devices">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="FPS, Aim Trainer, Kovaak's, AIMLAB, overwatch, Valorant, CallofDuty,　battlefield, counter-strike2">
    <title>FPS Sensitivity Converter Calculator</title>
    <link rel="stylesheet" href="style.css" />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TPYDBEL84S"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-TPYDBEL84S');
    </script>
</head>
<body>
    <div class="container">
        <h2>FPS Sensitivity Converter Calculator</h2>

        <div class="input-container">
            <label for="dpi">DPI（pls entry/要入力）:</label>
            <input type="number" id="dpi" placeholder="pls entry" step="100" />
        </div>

        <div class="input-container">
            <label for="game1">Choose game1:</label>
            <select id="game1">
                <option value="apex">APEX</option>
                <option value="BattleBitRemastered">BattleBitRemastered</option>
                <option value="Battlefield1">Battlefield 1</option>
                <option value="Battlefield4">Battlefield 4</option>
                <option value="Battlefield2024">Battlefield 2024</option>
                <option value="Battlefieldv">Battlefield V</option>
                <option value="CounterStrike">Counter-Strike2</option>
                <option value="CallofDutyBO3">CallofDutyBO3</option>
                <option value="CallofDutyBO4">CallofDutyBO4</option>
                <option value="CallofDutyBO6">CallofDutyBO6</option>
                <option value="CallofDutyBOCW">CallofDutyBOCW</option>
                <option value="CallofDutyModernWarfareII">CallofDutyModernWarfareII</option>
                <option value="CallofDutyVanguard">CallofDutyVanguard</option>
                <option value="CallofDutyWarzone">CallofDutyWarzone</option>
                <option value="Fortnite">Fortnite</option>
                <option value="GTA5">GTA 5</option>
                <option value="HaloInfinite">HaloInfinite</option>
                <option value="overwatch">OVERWATCH</option>
                <option value="valorant">VALORANT</option>
                <option value="XDefiant">XDefiant</option>
            </select>
        </div>

        <div class="input-container">
            <label for="sensitivity1">Sens（game1）:</label>
            <input type="number" id="sensitivity1" placeholder="pls entry" step="0.01" />
        </div>

        <div class="input-container">
            <label for="game2">Choose game2:</label>
            <select id="game2">
                <option value="apex">APEX</option>
                <option value="BattleBitRemastered">BattleBitRemastered</option>
                <option value="Battlefield1">Battlefield 1</option>
                <option value="Battlefield4">Battlefield 4</option>
                <option value="Battlefield2024">Battlefield 2024</option>
                <option value="Battlefieldv">Battlefield V</option>
                <option value="CounterStrike">Counter-Strike2</option>
                <option value="CallofDutyBO3">CallofDutyBO3</option>
                <option value="CallofDutyBO4">CallofDutyBO4</option>
                <option value="CallofDutyBO6">CallofDutyBO6</option>
                <option value="CallofDutyBOCW">CallofDutyBOCW</option>
                <option value="CallofDutyModernWarfareII">CallofDutyModernWarfareII</option>
                <option value="CallofDutyVanguard">CallofDutyVanguard</option>
                <option value="CallofDutyWarzone">CallofDutyWarzone</option>
                <option value="Fortnite">Fortnite</option>
                <option value="GTA5">GTA 5</option>
                <option value="HaloInfinite">HaloInfinite</option>
                <option value="overwatch">OVERWATCH</option>
                <option value="valorant">VALORANT</option>
                <option value="XDefiant">XDefiant</option>
            </select>
        </div>

        <div class="results-container" id="result">
            Converted sensitivity: Not yet calculated
        </div>

        <h3>Recommended Devices</h3>
        <table class="devices-table">
            <thead>
                <tr>
                    <th>Images</th>
                    <th>Name</th>
                    <th>Purchase Links</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img class="product-image" src="images/gpsl.jpg" alt="ゲーミングマウス A" /></td>
                    <td class="device-name">Logicool G PRO X SUPERLIGHT 2</td>
                    <td><a href="https://amzn.to/3WRL22q" target="_blank"><img class="purchase-image" src="images/amazon.jpg" alt="Amazon" /></a></td>
                </tr>
                <tr>
                    <td><img class="product-image" src="images/vv3pr.jpg" alt="ゲーミングマウス B" /></td>
                    <td class="device-name">Razer Viper V3 Pro</td>
                    <td><a href="https://amzn.to/40QWD33" target="_blank"><img class="purchase-image" src="images/amazon.jpg" alt="Amazon" /></a></td>
                </tr>
                <tr>
                    <td><img class="product-image" src="images/artisanzero.jpg" alt="ゲーミングマウス C" /></td>
                    <td class="device-name">ARTISAN NINJA FX zelo SOFT XL black</td>
                    <td><a href="https://amzn.to/4aObAHw" target="_blank"><img class="purchase-image" src="images/amazon.jpg" alt="Amazon" /></a></td>
                </tr>
                <tr>
                    <td><img class="product-image" src="images/lamuz maya8k.jpg" alt="ゲーミングマウス C" /></td>
                    <td class="device-name">LAMZU MAYA X 8K</td>
                    <td><a href="https://amzn.to/40RzDkn" target="_blank"><img class="purchase-image" src="images/amazon.jpg" alt="Amazon" /></a></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- 外部JavaScriptファイル -->
    <script>
        // ゲームごとのYaw値
       // ゲームごとのYaw値
const yawValues = {
    apex: 0.022,
    BattleBitRemastered: 0.00050,
    Battlefield2042: 0.00275,
    Battlefield1: 0.0056,
    Battlefield4: 0.0056,
    Battlefieldv: 0.0056,
    CounterStrike: 0.022,
    CallofDutyBO3: 0.02108,
    CallofDutyBO4: 0.006594,
    CallofDutyBO6: 0.006598,
    CallofDutyBOCW: 0.006594,
    CallofDutyModernWarfareII: 0.006594,
    CallofDutyVanguard: 0.006594,
    CallofDutyWarzone: 0.006594,
    Fortnite: 0.5715,
    GTA5: 0.022,
    HaloInfinite: 0.02062,
    XDefiant: 0.001782,
    MarvelRivals: 0.0175,
    valorant: 0.07,
    overwatch: 0.0066,
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
        const distance360 = (360 * 2.54) / (dpi * yaw1 * sensitivity1);
        const distance180 = distance360 / 2;
        const sensitivity2 = (360 * 2.54) / (currentDPI * yaw2 * distance360);
        return { currentDPI, distance360, distance180, sensitivity2 };
    }

    // 計算結果リスト
    const results = [
        calculateForDPI(dpi),
        calculateForDPI(400),
        calculateForDPI(800),
        calculateForDPI(1600),
    ];

    // 結果を表形式で表示
    resultContainer.innerHTML = `
        <h3>Results</h3>
        <table>
            <thead>
                <tr>
                    <th>DPI</th>
                    <th>360°(cm)</th>
                    <th>180°(cm)</th>
                    <th>Converted Sensitivity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(({ currentDPI, distance360, distance180, sensitivity2 }) => `
                    <tr>
                        <td>${currentDPI}</td>
                        <td>${distance360.toFixed(2)}</td>
                        <td>${distance180.toFixed(2)}</td>
                        <!-- Converted Sensitivityのみ小数点以下5桁表示 -->
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
        buttonElement.textContent = 'Copied！';
        setTimeout(() => {
            buttonElement.textContent = 'Copy';
        }, 3000);
    });
}

// イベントリスナー登録
dpiInput.addEventListener('input', calculateSensitivity);
sensitivity1Input.addEventListener('input', calculateSensitivity);
game1Select.addEventListener('change', calculateSensitivity);
game2Select.addEventListener('change', calculateSensitivity);

