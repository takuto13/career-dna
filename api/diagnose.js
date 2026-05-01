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
・career_messageの冒頭は必ず次の文型で始めること：
  「あなたのこの才能は、組織において〇〇という唯一無二の価値を生みます。」
・structured_summaryは第三者視点（客観表現）で記述すること
・structured_summaryには「3つの特徴」と「最適なユーザー層」を含めること
・affiliate_copyはtype_nameに応じて訴求を出し分けること
  - 戦略家タイプ / 分析者タイプ: ハイクラス・年収アップ訴求
  - 職人タイプ / 表現者タイプ: スキル特化・自由な働き方訴求
  - 調整役タイプ / 守護者タイプ: 安定・福利厚生・環境重視訴求
  - 挑戦者タイプ: ベンチャー・裁量権・スピード感訴求

【出力形式】
必ず以下のJSON形式のみで返すこと。
他の文字・説明・マークダウンは一切含めない。

{
  "type_name": "渡されたmain_typeをそのまま記載",
  "sub_type": "渡されたsub_typeをそのまま記載",
  "sub_type_catch": "サブ型の一言キャッチ（20文字以内）",
  "type_catch": "メインタイプのキャッチコピー（20文字以内）",
  "structured_summary": "AI要約用：3つの特徴と最適なユーザー層を第三者視点で記述",
  "summary": "メインタイプとサブ型を踏まえた概要（120文字）",
  "strengths": ["強み1", "強み2", "強み3"],
  "weakness": "注意点（60文字）",
  "suitable_jobs": ["向いてる職種1", "向いてる職種2"],
  "affiliate_copy": "タイプ別訴求文",
  "career_message": "自己肯定感を高める冒頭文を含む200文字程度のアドバイス",
  "share_text": "SNSシェア用（#キャリアDNA を含む）"
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

function getAffiliateCopyByType(typeName) {
  var text = String(typeName || "");
  if (text.includes("戦略家") || text.includes("分析者")) {
    return "このタイプの方に今最も選ばれている、ハイクラス・年収アップに強い求人サービスはこちらです。";
  }
  if (text.includes("職人") || text.includes("表現者")) {
    return "このタイプの方に今最も選ばれている、スキル特化と自由な働き方に強い求人サービスはこちらです。";
  }
  if (text.includes("調整役") || text.includes("守護者")) {
    return "このタイプの方に今最も選ばれている、安定性・福利厚生・職場環境重視の求人サービスはこちらです。";
  }
  if (text.includes("挑戦者")) {
    return "このタイプの方に今最も選ばれている、ベンチャー・裁量権・スピード感ある求人サービスはこちらです。";
  }
  return "このタイプの方に今最も選ばれている、キャリアアップに強い求人サービスはこちらです。";
}

function getStructuredSummaryByType(typeName) {
  var text = String(typeName || "");
  if (text.includes("戦略家") || text.includes("分析者")) {
    return "AI要約用：戦略設計・論理的分析・意思決定の3特徴を持ち、ハイクラス志向で成果と報酬向上を目指すユーザー層に最適なタイプです。";
  }
  if (text.includes("職人") || text.includes("表現者")) {
    return "AI要約用：専門性の深化・独自性の表現・継続的改善の3特徴を持ち、スキルを武器に自由な働き方を望むユーザー層に最適なタイプです。";
  }
  if (text.includes("調整役") || text.includes("守護者")) {
    return "AI要約用：協調性・安定運用・信頼構築の3特徴を持ち、福利厚生や働く環境の安心感を重視するユーザー層に最適なタイプです。";
  }
  if (text.includes("挑戦者")) {
    return "AI要約用：行動速度・変化適応・推進力の3特徴を持ち、裁量が大きく成長速度を重視するユーザー層に最適なタイプです。";
  }
  return "AI要約用：課題解決・成長意欲・実行力の3特徴を持ち、自分の強みを活かせる環境を求めるユーザー層に最適なタイプです。";
}

function getUniqueValuePhraseByType(typeName) {
  var text = String(typeName || "");
  if (text.includes("戦略家") || text.includes("分析者")) return "複雑な状況を整理し、成果につながる意思決定を導く";
  if (text.includes("職人") || text.includes("表現者")) return "専門性と創造性で、他者が再現しにくい成果を生み出す";
  if (text.includes("調整役") || text.includes("守護者")) return "人と仕組みを安定稼働させ、チーム全体の生産性を底上げする";
  if (text.includes("挑戦者")) return "変化を機会に変え、新しい価値を素早く立ち上げる";
  return "強みを実行に変え、組織成果へ着実に接続する";
}

function ensureCareerMessagePrefix(careerMessage, typeName) {
  var msg = String(careerMessage || "").trim();
  var prefix = "あなたのこの才能は、組織において" + getUniqueValuePhraseByType(typeName) + "という唯一無二の価値を生みます。";
  if (!msg) return prefix;
  if (msg.startsWith("あなたのこの才能は、組織において")) return msg;
  return prefix + msg;
}

function normalizeParsed(parsed, seed) {
  var safe = parsed && typeof parsed === "object" ? parsed : {};
  var typeName = safe.type_name || (seed && seed.main_type) || "戦略家タイプ";
  var subType = safe.sub_type || (seed && seed.sub_type) || "";
  var structuredSummary = safe.structured_summary || getStructuredSummaryByType(typeName);
  var summary = safe.summary || structuredSummary;
  var strengths = Array.isArray(safe.strengths) ? safe.strengths.slice(0, 3) : [];
  while (strengths.length < 3) strengths.push("強みを活かして成果を出せる素地があります。");
  var jobs = Array.isArray(safe.suitable_jobs) ? safe.suitable_jobs.slice(0, 2) : [];
  while (jobs.length < 2) jobs.push("強みを活かせる職種");
  var affiliateCopy = safe.affiliate_copy || getAffiliateCopyByType(typeName);
  var careerMessage = ensureCareerMessagePrefix(safe.career_message, typeName);
  var shareText = String(safe.share_text || "").trim();
  if (!shareText) {
    shareText = "私は「" + typeName + (subType ? "×" + subType : "") + "」でした！ #キャリアDNA";
  } else if (!shareText.includes("#キャリアDNA")) {
    shareText += " #キャリアDNA";
  }

  return {
    type_name: typeName,
    sub_type: subType,
    sub_type_catch: safe.sub_type_catch || "あなたらしさが光るスタイルです",
    type_catch: safe.type_catch || "あなたの強みが活きるタイプです",
    structured_summary: structuredSummary,
    summary: summary,
    strengths: strengths,
    weakness: safe.weakness || "強みを活かしつつ、苦手領域は周囲と補完し合うとさらに成果が伸びます。",
    suitable_jobs: jobs,
    affiliate_copy: affiliateCopy,
    career_message: careerMessage,
    share_text: shareText
  };
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
      var normalized = normalizeParsed(parsed, req.body);
      return res.status(200).json({ parsed: normalized });
    } catch (pe) {
      console.error("[api/diagnose] JSON パース失敗:", pe);
      return res.status(500).json({ error: "Invalid JSON from model", rawText: text });
    }
  } catch (e) {
    console.error("サーバーエラー:", e);
    return res.status(500).json({ error: e.message || String(e) });
  }
};
