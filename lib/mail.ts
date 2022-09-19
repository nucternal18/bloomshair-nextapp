import { NEXT_URL } from "../config";

export async function sendMail({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const response = await fetch(`${NEXT_URL}/api/send-mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    const data = await response.json();
    if (response.ok) {
      return data.message;
    }
  } catch (e: any) {
    console.error(e);
    throw new Error(`Could not send email: ${e.message}`);
  }
}
