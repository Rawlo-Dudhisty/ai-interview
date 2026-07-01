import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { resumeId } = await req.json();

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
    });

    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume not found.",
        },
        { status: 404 }
      );
    }

    const prompt = `
You are an ATS Resume Expert.

Analyze this resume.

Resume:

${resume.content}

Return ONLY valid JSON.

{
  "atsScore":90,
  "summary":"Short professional summary",

  "strengths":[
    "Strong React experience",
    "Excellent AI knowledge",
    "Good project portfolio"
  ],

  "weaknesses":[
    "Add measurable achievements",
    "Improve resume formatting"
  ],

  "keywords":[
    "Docker",
    "AWS",
    "CI/CD",
    "Kubernetes"
  ]
}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const text = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(text);

    await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        atsScore: analysis.atsScore,
        summary: analysis.summary,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        keywords: analysis.keywords,
      },
    });

    return NextResponse.json({
      success: true,
      analysis,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Resume analysis failed.",
      },
      {
        status: 500,
      }
    );
  }
}