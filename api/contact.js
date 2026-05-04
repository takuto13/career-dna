var NAME_MAX = 100;
var EMAIL_MAX = 254;
var MESSAGE_MAX = 2000;
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(input) {
  return String(input || "").trim();
}

module.exports = async function contactHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const name = sanitize(req.body?.name).slice(0, NAME_MAX);
    const email = sanitize(req.body?.email).slice(0, EMAIL_MAX);
    const topic = sanitize(req.body?.topic).slice(0, 100);
    const message = sanitize(req.body?.message).slice(0, MESSAGE_MAX);

    if (!name || !email || !message) {
      return res.status(400).json({ error: "必須項目が未入力です。" });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "メールアドレスの形式が正しくありません。" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "サーバー設定エラーが発生しました" });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "careerdna@outlook.com";

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "キャリアDNA <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `【お問い合わせ】${topic ? topic + " / " : ""}${name}さんより`,
        text: [
          "CareerDNAお問い合わせフォームから送信されました。",
          "",
          `氏名: ${name}`,
          `メールアドレス: ${email}`,
          `種類: ${topic || "未選択"}`,
          "",
          "お問い合わせ内容:",
          message
        ].join("\n")
      })
    });

    if (!response.ok) {
      const detail = await response.json().catch(() => ({}));
      console.error("Resend APIエラー:", response.status, detail);
      return res.status(500).json({ error: "送信に失敗しました。時間をおいて再度お試しください。" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("contactHandler エラー:", error);
    return res.status(500).json({
      error: "送信に失敗しました。時間をおいて再度お試しください。"
    });
  }
};
