import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true
});

export const CalculateCaloriesAI = async (PROMPT) => await openai.chat.completions.create({
  model: "google/gemini-2.0-flash-lite-001",
  messages: [
    {
      role: "user",
      content: PROMPT
    },
  ]
});