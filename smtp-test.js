import nodemailer from "nodemailer";

(async () => {
  try {
    console.log("Testing SMTP connection...");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // try 465 if needed
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP connection successful!");
  } catch (err) {
    console.error("❌ SMTP connection failed:", err);
  }
})();
