import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true
});

const AIMODELNAME = "google/gemini-2.0-flash-lite-001";

export const CalculateCaloriesAI = async (PROMPT) => await openai.chat.completions.create({
  model: AIMODELNAME,
  messages: [
    {
      role: "user",
      content: PROMPT
    },
  ],
  response_format: "json_object"
});

export const GenerateRecipeOptionsAI = async (PROMPT) => await openai.chat.completions.create({
  model: AIMODELNAME,
  messages: [
    {
      role: "user",
      content: PROMPT
    },
  ],
  response_format: "json_object"
});