import { GoogleGenAI } from "@google/genai";
import { GeneratedSoul } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSoul = async (blueprint: string, chips: string[]): Promise<GeneratedSoul> => {
  try {
    const ai = getClient();
    
    // 1. Generate Image
    const prompt = `A surreal, ethereal digital art masterpiece. A humanoid doll soul constructed from a ${blueprint} base, infused with elements of ${chips.join(', ')}. 
    Aesthetic: Glitch art, high-key lighting, medical schematic background, translucent glass parts, neon cyan and magenta accents. 
    The style is "Ethereal Glitch". High detail, masterpiece, 8k resolution.`;

    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using fast flash image model
      contents: {
        parts: [{ text: prompt }]
      },
    });

    let imageUrl = "https://picsum.photos/600/600"; // Fallback
    
    // Extract image
    for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }

    // 2. Generate Diagnosis Data
    const analysisPrompt = `Analyze a digital soul made of ${chips.join(' + ')}. 
    Return a JSON object with:
    - grade: string (SSS, S, A, B, C)
    - fidelity: number (0-100)
    - entropy: string (LOW, MEDIUM, HIGH)
    - stability: string (STABLE, VOLATILE, NULL)
    - analysis: string (A cryptic, poetic, 1-sentence diagnostic observation in the style of a sci-fi medical log).`;

    const textResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', // Updated to gemini-3-flash-preview
        contents: analysisPrompt,
        config: { responseMimeType: 'application/json' }
    });

    const textData = JSON.parse(textResponse.text || '{}');

    return {
      imageUrl,
      grade: textData.grade || 'A',
      fidelity: textData.fidelity || 85,
      entropy: (textData.entropy as any) || 'MEDIUM',
      stability: (textData.stability as any) || 'STABLE',
      analysis: textData.analysis || 'Subject demonstrates acceptable parameters. Soul cohesion nominal.'
    };

  } catch (error) {
    console.error("Soul generation failed", error);
    // Fallback mock
    return {
      imageUrl: "https://picsum.photos/600/600?grayscale",
      grade: 'ERR',
      fidelity: 0,
      entropy: 'HIGH',
      stability: 'NULL',
      analysis: 'Connection to server severed. Simulation incomplete.'
    };
  }
};