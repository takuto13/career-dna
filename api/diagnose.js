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

function buildUserPromptFromPayload(body) {
  var mainType = body && body.main_type;
  var subType = body && body.sub_type;
  var counts = body && body.counts;
  if (!mainType || !subType || !counts) return null;
  if (
    typeof counts.A !== "number" ||
    typeof counts.B !== "number" ||
    typeof counts.C !== "number" ||
    typeof counts.D !== "number"
  ) {
    return null;
  }
  return (
    "以下はユーザーの診断回答結果です。\n\n" +
    "【メインタイプ】" + mainType + "\n" +
    "【サブ型】" + subType + "\n" +
    "【回答集計】\n" +
    "A（戦略・分析）：" + counts.A + "回\n" +
    "B（専門・職人）：" + counts.B + "回\n" +
    "C（調整・育成）：" + counts.C + "回\n" +
    "D（挑戦・創造）：" + counts.D + "回\n\n" +
    "上記のmain_typeとsub_typeを必ずそのまま使用して\n" +
    "診断結果を生成してください。"
  );
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    var apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ANTHROPIC_API_KEY is missing" });
    }

    var userPrompt = req.body && typeof req.body.user === "string"
      ? req.body.user
      : buildUserPromptFromPayload(req.body);

    if (!userPrompt) {
      return res.status(400).json({ error: "Missing user prompt" });
    }

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

    var data = await response.json();
    if (!response.ok) {
      console.error("Anthropic APIエラー:", response.status, JSON.stringify(data));
      return res.status(500).json({ error: "API error", detail: data });
    }

    var text = Array.isArray(data.content)
      ? data.content.map(function (i) { return i && i.text ? i.text : ""; }).join("")
      : "";

    try {
      var jsonMatch = text.match(/\{[\s\S]*\}/);
      var parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : parseModelJson(text);
      return res.status(200).json({ parsed: parsed });
    } catch (pe) {
      console.error("[api/diagnose] JSON パース失敗:", pe);
      return res.status(500).json({ error: "Invalid JSON from model", rawText: text });
    }
  } catch (e) {
    console.error("サーバーエラー:", e);
    return res.status(500).json({ error: e.message || String(e) });
  }
};
