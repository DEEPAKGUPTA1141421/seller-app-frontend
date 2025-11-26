import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string, category: string, attributes: string): Promise<string> => {
  try {
    const prompt = `Write a compelling, SEO-friendly product description for an e-commerce listing. 
    Product Name: ${productName}
    Category: ${category}
    Key Attributes: ${attributes}
    
    Keep it professional, highlighting key benefits. Limit to 100 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating description. Please try again.";
  }
};

export const analyzeSalesPerformance = async (salesData: any[]): Promise<string> => {
  try {
    const dataString = JSON.stringify(salesData);
    const prompt = `Analyze the following weekly sales data for an online seller and provide 3 brief, actionable insights (bullet points) to improve performance.
    Data: ${dataString}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No insights available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not analyze data at this time.";
  }
};

export const getSupportChatResponse = async (userMessage: string): Promise<string> => {
  try {
    const prompt = `You are a helpful support assistant for the SellerHub app. 
    Help the seller with their query about orders, payments, or account settings. 
    Keep answers concise and professional.
    
    User Query: ${userMessage}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "I didn't understand that.";
  } catch (error) {
    return "Support system is currently offline.";
  }
};