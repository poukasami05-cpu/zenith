import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

export const askProductAI = async (question: string, product: Product): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set in environment variables.");
    return "I'm sorry, I can't connect to the AI service right now. Please try again later.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using a lighter model for quick responses
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are an expert footwear specialist for ZENITH, a luxury shoe brand.
        The user is asking a question about the following product:
        Name: ${product.name}
        Price: $${product.price}
        Description: ${product.description}
        Features: ${product.features.join(', ')}
        Specs: ${JSON.stringify(product.specs)}

        User Question: "${question}"

        Answer concisely (under 50 words), professionally, and with a tone of sophistication and helpfulness.
        Focus on fit, sizing advice, material quality, and styling tips.
        If asked about size, generally recommend true-to-size unless otherwise noted.
      `,
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm having trouble retrieving that information. Please check your network connection.";
  }
};