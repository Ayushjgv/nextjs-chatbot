//chatbot


import "dotenv/config";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const chatCompletion = await client.chatCompletion({
    model: "arcee-ai/Trinity-Large-Thinking:featherless-ai",
    messages: [
        {
            role: "user",
            content: "What is the capital of India?",
        },
    ],
});

console.log(chatCompletion.choices[0].message);


//image generation

// import "dotenv/config";
// import { InferenceClient } from "@huggingface/inference";
// import fs from "fs";

// const client = new InferenceClient(process.env.HF_TOKEN);

// async function run() {
// 	try {
// 		const image = await client.textToImage({
// 			model: "black-forest-labs/FLUX.1-schnell",
// 			inputs: "Astronaut riding a horse, cinematic, ultra realistic"
// 		});

// 		const buffer = Buffer.from(await image.arrayBuffer());
// 		fs.writeFileSync("output.png", buffer);

// 		console.log("✅ Image saved");
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// run();