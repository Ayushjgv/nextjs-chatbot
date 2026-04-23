// import { Groq } from 'groq-sdk';
// import dotenv from "dotenv";

// dotenv.config();

// const groq = new Groq();

// const chatCompletion = await groq.chat.completions.create({
// 	"messages": [
// 		{
// 			"role": "user",
// 			"content": "hii"
// 		},
// 		{
// 			"role": "assistant",
// 			"content": "Hi! How are you doing today? Is there something I can help you with or would you like to chat?"
// 		},
// 		{
// 			"role": "user",
// 			"content": ""
// 		}
// 	],
// 	"model": "meta-llama/llama-4-scout-17b-16e-instruct",
// 	"temperature": 1,
// 	"max_completion_tokens": 1024,
// 	"top_p": 1,
// 	"stream": true,
// 	"stop": null
// });

// for await (const chunk of chatCompletion) {
// 	process.stdout.write(chunk.choices[0]?.delta?.content || '');
// }



import dotenv from "dotenv";
dotenv.config();
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const chatCompletion = await client.chatCompletion({
	model: "zai-org/GLM-5.1:together",
	messages: [
		{
			role: "user",
			content: "What is the capital of France?",
		},
	],
});

console.log(chatCompletion.choices[0].message);