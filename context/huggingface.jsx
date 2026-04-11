//chatbot
import { useState,useContext,createContext,useEffect } from "react";
import fs from "fs";
import "dotenv/config";
import { InferenceClient } from "@huggingface/inference";

const chatbotClient = new InferenceClient(process.env.HF_TOKEN);

const chatCompletion = await chatbotClient.chatCompletion({
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

// const imageClient = new InferenceClient(process.env.HF_TOKEN);

// async function run() {
//     try {
//         const image = await imageClient.textToImage({
//             model: "black-forest-labs/FLUX.1-schnell",
//             inputs: "Astronaut riding a horse, cinematic, ultra realistic"
//         });

//         const buffer = Buffer.from(await image.arrayBuffer());
//         fs.writeFileSync("output.png", buffer);

//         console.log("✅ Image saved");
//     } catch (err) {
//         console.error(err);
//     }
// }

// run();



