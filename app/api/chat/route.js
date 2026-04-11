// app/api/chat/route.js
import { InferenceClient } from "@huggingface/inference";

export async function POST(req) {
	const { message } = await req.json();

	const client = new InferenceClient(process.env.HF_TOKEN);

	const response = await client.chatCompletion({
		model: "arcee-ai/Trinity-Large-Thinking:featherless-ai",
		messages: [
			{
				role: "system",
				content: "You are a helpful assistant. Give short, clear answers. Avoid long explanations.",
			},
			{
				role: "user",
				content: message,
			},
		],
	});

	return Response.json({
		reply: response.choices[0].message.content,
	});
}