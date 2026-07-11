import { ai } from "../ai/gemini";
import { buildPrompt } from "../ai/prompt";
import { CRMArraySchema } from "../types/crm";

function extractJson(text: string) {
  // Remove markdown code fences
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Find first JSON array
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");

  if (start === -1 || end === -1) {
    throw new Error("No JSON array found in Gemini response");
  }

  return cleaned.substring(start, end + 1);
}

type CSVRow = Record<string, string>;

export async function extractCRM(rows: CSVRow[]){
  const prompt = buildPrompt(rows);

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
      contents: prompt,
    });

    const text = response.text ?? "";

    const json = extractJson(text);

    const parsed = JSON.parse(json);

    return CRMArraySchema.parse(parsed);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}