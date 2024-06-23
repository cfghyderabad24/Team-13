import { Resend } from "resend";

const sendEmail = async (email, subject, message) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: subject,
      text: message,
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
