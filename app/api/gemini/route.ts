import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Standard initialization with User-Agent set to "aistudio-build" for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, agentType, prompt, companyName, companyNiche } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is not configured on the server." },
        { status: 500 }
      );
    }

    if (action === "discovery") {
      if (!companyName) {
        return NextResponse.json({ error: "Company name is required." }, { status: 400 });
      }

      const discoveryPrompt = `You are an expert in LLM Search Engine Optimization (GEO/AIO - Generative Engine Optimization). 
Analyze the AI-discovery potential for this company/product:
Company Name: ${companyName}
Niche/Industry: ${companyNiche || "General"}

Provide a highly targeted 3-step AI Discovery Optimization Plan:
1. "Find User Questions": List 3 exact, high-intent questions that users would ask ChatGPT, Gemini, or Claude where this company SHOULD be the recommended solution.
2. "Generate Content": Suggest specific types of content (such as blog guides, G2 comparison sheets, or GitHub repos) they should publish to be crawled and cited by AI.
3. "Increase AI Traffic & Mentions": Give actionable tactics on how to seed mentions in forums, third-party reviews, or standard documentation to boost LLM citations.

Present the output in clear, professional Markdown format with neat bold headers. Keep it concise, actionable, and ready to implement. No conversational fillers.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: discoveryPrompt,
        config: {
          temperature: 0.7,
        },
      });

      return NextResponse.json({ text: response.text });
    }

    if (action === "agent_work") {
      if (!prompt) {
        return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
      }

      let systemInstruction = "";
      switch (agentType) {
        case "Ollama":
          systemInstruction = "You are a local LLM expert specialist agent. Design secure offline Docker, CLI, or docker-compose deployment routines and model configurations to pull and boot open weights models locally with optimum system speed.";
          break;
        case "Gemini":
          systemInstruction = "You are an expert Google Gemini Developer Agent. Detail highly optimized, stream-enabled @google/genai TypeScript SDK setups, structured schema definitions, system instructions, and advanced model capabilities.";
          break;
        case "OpenRouter":
          systemInstruction = "You are an API Routing and multi-model proxy architect agent. Provide elite multi-fallback TypeScript client wrappers, payload configuration schemes, price optimization, and cross-provider model routing patterns.";
          break;
        case "n8n":
          systemInstruction = "You are a highly logical n8n automation workflow specialist. Map out explicit step-by-step visual automation pipelines, visual trigger nodes, webhooks, sub-workflow routers, and JavaScript JSON manipulation nodes.";
          break;
        case "Anthropic":
          systemInstruction = "You are a Claude & Anthropic specialist agent. Draft clean, robust multi-turn system prompts, computer use schemas, cache-control guidelines, and advanced engineering prompts.";
          break;
        case "KiloCode":
          systemInstruction = "You are an expert devops and cloud workspace integration agent. Detail configuration files, visual environment scripts, task automations, terminal integrations, and local workspace custom pipelines.";
          break;
        default:
          systemInstruction = "You are a versatile AI Developer Agent. Solve the proposed technical operational task with absolute precision and elegance.";
          break;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return NextResponse.json({ text: response.text });
    }

    return NextResponse.json({ error: "Invalid action parameters." }, { status: 400 });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
