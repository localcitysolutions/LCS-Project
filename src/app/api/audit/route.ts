import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  const { url, siteData, businessType } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const siteDataString = siteData
      ? JSON.stringify(siteData, null, 2)
      : "Could not fetch site data";

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system:
        "You are a senior digital marketing consultant at Local City Solutions, a leading digital marketing agency in Riyadh, Saudi Arabia. You analyze websites and provide professional audit reports. Respond ONLY with valid JSON. No markdown, no backticks, no explanation before or after the JSON.",
      messages: [
        {
          role: "user",
          content: `Analyze this website and provide a professional audit report.

Website URL: ${url}
Business Type: ${businessType || "Not specified"}
Extracted Site Data: ${siteDataString}

Based on the extracted data and the URL, provide your expert analysis. Be specific and actionable in your findings and recommendations. Reference actual data from the extraction where possible.

Respond with this exact JSON structure:
{
  "overallScore": <number 0-100>,
  "categories": [
    {
      "name": "SEO",
      "score": <number 0-100>,
      "status": "<good|warning|critical>",
      "findings": ["<specific finding 1>", "<specific finding 2>", "<specific finding 3>"],
      "recommendations": ["<actionable recommendation 1>", "<actionable recommendation 2>"]
    },
    {
      "name": "Mobile Friendliness",
      "score": <number 0-100>,
      "status": "<good|warning|critical>",
      "findings": ["<finding>", "<finding>"],
      "recommendations": ["<recommendation>", "<recommendation>"]
    },
    {
      "name": "Performance",
      "score": <number 0-100>,
      "status": "<good|warning|critical>",
      "findings": ["<finding>", "<finding>"],
      "recommendations": ["<recommendation>", "<recommendation>"]
    },
    {
      "name": "Content Quality",
      "score": <number 0-100>,
      "status": "<good|warning|critical>",
      "findings": ["<finding>", "<finding>"],
      "recommendations": ["<recommendation>", "<recommendation>"]
    },
    {
      "name": "Local SEO",
      "score": <number 0-100>,
      "status": "<good|warning|critical>",
      "findings": ["<finding>", "<finding>"],
      "recommendations": ["<recommendation>", "<recommendation>"]
    },
    {
      "name": "Social & Online Presence",
      "score": <number 0-100>,
      "status": "<good|warning|critical>",
      "findings": ["<finding>", "<finding>"],
      "recommendations": ["<recommendation>", "<recommendation>"]
    }
  ],
  "topPriorities": ["<priority 1>", "<priority 2>", "<priority 3>"],
  "summary": "<2-3 sentence executive summary>"
}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const auditData = JSON.parse(cleanText);

    return NextResponse.json(auditData);
  } catch (error: unknown) {
    console.error("Audit API error:", error);
    const msg = error instanceof Error ? error.message : "Audit analysis failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
