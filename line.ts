import { getQuestions } from "./sheets.ts";

export async function handleLineRequest(req: Request) {
  const body = await req.json();
  const event = body.events?.[0];
  if (!event) return new Response("No event", { status: 200 });

  const replyToken = event.replyToken;
  const text = event.message?.text;

  const questions = getQuestions();
  const q = questions[Math.floor(Math.random() * questions.length)];

  const reply = {
    replyToken,
    messages: [
      {
        type: "text",
        text: `📖 ${q.story}\n\n❓${q.question}\nA. ${q.options[0]}\nB. ${q.options[1]}\nC. ${q.options[2]}\nD. ${q.options[3]}`,
      },
    ],
  };

  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("LINE_TOKEN")}`,
    },
    body: JSON.stringify(reply),
  });

  return new Response("OK", { status: 200 });
}
