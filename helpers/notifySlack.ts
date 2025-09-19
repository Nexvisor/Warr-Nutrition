import axios from "axios";
const slackWebHook = process.env.SLACK_WEB_HOOK!;
console.log(slackWebHook);

export async function notifySlack(message: string) {
  const payload = { text: message };

  try {
    const response = await axios.post(slackWebHook, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Slack API Response:", response.data);
  } catch (error: any) {
    console.error("Error sending message to Slack:", error.message);
  }
}
