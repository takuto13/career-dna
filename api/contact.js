const nodemailer = require("nodemailer");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

function sanitize(input) {
  return String(input || "").trim();
}

module.exports = async function contactHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const name = sanitize(req.body?.name);
    const email = sanitize(req.body?.email);
    const message = sanitize(req.body?.message);

    if (!name || !email || !message) {
      return res.status(400).json({ error: "必須項目が未入力です。" });
    }

    const smtpHost = requireEnv("SMTP_HOST");
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = requireEnv("SMTP_USER");
    const smtpPass = requireEnv("SMTP_PASS");
    const fromEmail = process.env.FROM_EMAIL || smtpUser;
    const contactToEmail = requireEnv("CONTACT_TO_EMAIL");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: fromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `【CareerDNAお問い合わせ】${name}さんより`,
      text: [
        "CareerDNAお問い合わせフォームから送信されました。",
        "",
        `氏名: ${name}`,
        `メールアドレス: ${email}`,
        "",
        "お問い合わせ内容:",
        message
      ].join("\n")
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: "送信に失敗しました。時間をおいて再度お試しください。",
      detail: String(error)
    });
  }
};
