import nodemailer from "nodemailer";

const notifer_email = process.env.NOTIFER_EMAIL!;
const APP_PASSWORD = process.env.EMAIL_APP_PASSWORD!;
const SENDER_EMAIL = process.env.SENDER_EMAIL!;

async function sendMessage(message: string, buyerName: string) {
  try {
    const transporter = nodemailer.createTransport({
      port: 587,
      secure: true,
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `<${notifer_email}>`,
      to: notifer_email,
      subject: `Order Confirm for ${buyerName}`,
      text: message,
    });

    return { success: true, message: "Email send successfully" };
  } catch (error) {
    console.error("Error sending  email:", error);
    return { success: false, message: "Failed to send OTP", error };
  }
}

export default sendMessage;
