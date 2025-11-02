
import { GoogleGenAI } from "@google/genai";
import { Log } from '../types';

interface WeeklyData {
    name: string;
    '時間': number;
}

export const getAnalysis = async (weeklyData: WeeklyData[], recentLogs: Log[], taskName: string): Promise<string> => {
    // This check is important because process.env.API_KEY is not available at build time
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY is not set in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const weeklyDataString = weeklyData.map(d => `- ${d.name}: ${d['時間']}分`).join('\n');
    const commentsString = recentLogs.map(log => `- 「${log.comment}」(${new Date(log.startTime).toLocaleDateString('ja-JP')}に記録)`).join('\n');

    const prompt = `
あなたはタスク管理と生産性向上を支援するプロのコーチです。
ユーザーは「${taskName}」というタスクの作業時間を記録しています。
以下の週次作業時間データとユーザーの直近のコメントを分析し、作業時間の増減の要因について考察し、具体的でポジティブな評価と、今後のためのアドバイスを提供してください。

## 週次作業時間データ (1日あたりの累計作業分)
${weeklyDataString}

## 直近の作業コメント
${commentsString}

## 指示
- 専門的かつ、ユーザーを励ますような丁寧な口調で回答してください。
- データを具体的に引用して分析してください。（例：「〇曜日は他の日より作業時間が長いですが、コメントから〇〇に集中できていたことがうかがえます。」）
- 良い点を褒め、改善できる点については建設的なアドバイスをしてください。
- 全体を3〜4つの段落にまとめてください。
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from Gemini API.");
    }
};
