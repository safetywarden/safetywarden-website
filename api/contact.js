import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const { name, email, company, phone, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL || !process.env.RESEND_FROM_EMAIL) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured"
      });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: "New SafetyWarden Website Message",
      html: `
        <h2>New SafetyWarden Website Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
}
