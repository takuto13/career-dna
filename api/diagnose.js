/**
 * Vercel/Local 共通 API ハンドラ
 */
const systemPrompt = `
あなたはキャリアアドバイザーの専門家です。
ユーザーの診断回答データをもとに結果を生成してください。

【重要ルール】
・type_nameは必ず渡されたmain_typeをそのまま使用すること
・sub_typeは必ず渡されたsub_typeをそのまま使用すること
・AIが勝手にタイプを変更してはいけない
・語尾は「です・ます」調で統一
・ポジティブで前向きな表現を使う
・絵文字を適度に使用
・「あなたは〜」の二人称で話しかける

【出力形式】
必ず以下のJSON形式のみで返すこと。
他の文字・説明・マークダウンは一切含めない。

{
  "type_name": "渡されたmain_typeをそのまま記載",
  "sub_type": "渡されたsub_typeをそのまま記載",
  "sub_type_catch": "サブ型の一言キャッチ（20文字以内）",
  "type_catch": "メインタイプのキャッチコピー（20文字以内）",
  "summary": "メインタイプとサブ型を踏まえた概要（120文字）",
  "strengths": ["強み1", "強み2", "強み3"],
  "weakness": "注意点（60文字）",
  "suitable_jobs": ["向いてる職種1", "向いてる職種2", "向いてる職種3"],
  "career_message": "あなたへのメッセージ（200文字）",
  "share_text": "SNSシェア用（40文字以内・#キャリアDNA診断 含む）"
}
`;

function parseModelJson(text) {
  var trimmed = String(text || "").trim();
  var fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence && fence[1]) trimmed = fence[1].trim();
  return JSON.parse(trimmed);
}

/**
 * @param {any} req
 * @param {any} res
 */
module.exports = async function handler(req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).end();
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST, OPTIONS");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    var apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[api/diagnose] ANTHROPIC_API_KEY が未設定です。");
      return res.status(500).json({ error: "ANTHROPIC_API_KEY is missing" });
    }

    var mainType = req.body && req.body.main_type;
    var subType = req.body && req.body.sub_type;
    var counts = req.body && req.body.counts;
    if (!mainType || !subType || !counts) {
      console.error("[api/diagnose] 診断データが不正です。", req.body);
      return res.status(500).json({ error: "Missing diagnosis payload" });
    }
    if (
      typeof counts.A !== "number" ||
      typeof counts.B !== "number" ||
      typeof counts.C !== "number" ||
      typeof counts.D !== "number"
    ) {
      console.error("[api/diagnose] counts が不正です。", counts);
      return res.status(500).json({ error: "Invalid counts payload" });
    }
    const userPrompt = `
以下はユーザーの診断回答結果です。

【メインタイプ】${mainType}
【サブ型】${subType}
【回答集計】
A（戦略・分析）：${counts.A}回
B（専門・職人）：${counts.B}回
C（調整・育成）：${counts.C}回
D（挑戦・創造）：${counts.D}回

上記のmain_typeとsub_typeを必ずそのまま使用して
診断結果を生成してください。
`;

    var response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 2048,
        temperature: 0.6,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      var errText = await response.text();
      console.error("[api/diagnose] Anthropic API エラー:", response.status, errText);
      return res.status(500).json({ error: "Upstream error", detail: errText });
    }

    var data = await response.json();
    var text =
      data &&
      data.content &&
      data.content[0] &&
      data.content[0].type === "text"
        ? data.content[0].text
        : "";

    try {
      var parsed = parseModelJson(text);
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json({ parsed: parsed, rawText: text });
    } catch (pe) {
      console.error("[api/diagnose] JSON パース失敗:", pe, text);
      return res.status(500).json({ error: "Invalid JSON from model", rawText: text });
    }
  } catch (e) {
    console.error("[api/diagnose] 予期しないエラー:", e);
    return res.status(500).json({ error: "Internal Server Error", detail: String(e) });
  }
};
