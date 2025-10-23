
import { GoogleGenAI } from "@google/genai";

export const fetchMotivationalQuote = async (): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      console.warn("API key not found. Using fallback quote.");
      return "The secret of getting ahead is getting started. – Mark Twain";
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Give me a short, inspiring motivational quote about focus and productivity. Just the quote itself, without any introductory text or quotation marks.',
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching motivational quote:", error);
    return "The only way to do great work is to love what you do. – Steve Jobs";
  }
};
