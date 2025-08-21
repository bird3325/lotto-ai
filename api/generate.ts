import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

// This is a Vercel Serverless Function
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
      return response.status(500).json({ error: "API_KEY environment variable not set." });
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
        numbers: {
            type: Type.ARRAY,
            items: { type: Type.INTEGER },
            description: "An array of 6 unique integers between 1 and 45, sorted in ascending order.",
        },
        analysis: {
            type: Type.STRING,
            description: "A brief, one-sentence analysis of the generated numbers in Korean.",
        },
    },
    required: ["numbers", "analysis"],
  };

  try {
    const prompt = `
      You are an AI assistant specialized in generating Korean Lotto 6/45 numbers.
      Your task is to generate a set of 6 unique numbers between 1 and 45.
      The generation logic should be based on a statistical analysis of recent winning numbers, favoring a mix of frequently appearing numbers and random chance.
      Also, provide a very brief, one-sentence analysis in Korean of the generated numbers. For example, mention how many frequently appearing numbers are included, or comment on the balance of odd/even numbers.
      Return the result in the specified JSON format, with the numbers sorted in ascending order.
    `;
    
    const geminiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.9
        },
    });
    
    const jsonString = geminiResponse.text() || '';
    const parsedResult = JSON.parse(jsonString);

    if (
        !parsedResult.numbers || 
        !Array.isArray(parsedResult.numbers) ||
        parsedResult.numbers.length !== 6 ||
        !parsedResult.analysis
    ) {
        throw new Error("Invalid response format from AI.");
    }

    return response.status(200).json(parsedResult);

  } catch (error) {
      console.error("Error generating lotto numbers:", error);
      return response.status(500).json({ error: "Failed to generate numbers from Gemini API." });
  }
}