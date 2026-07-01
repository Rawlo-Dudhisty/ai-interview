import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      jobRole,
      experience,
      techStack,
      description,
    } = body;

    const prompt = `
You are an expert technical interviewer.

Generate exactly 10 interview questions with answers.

Job Role:
${jobRole}

Experience:
${experience}

Tech Stack:
${techStack}

Job Description:
${description}

Return ONLY valid JSON.

Example:

[
  {
    "question": "Explain React Hooks.",
    "answer": "React Hooks allow functional components to use state and lifecycle features."
  }
]
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedQuestions;

    try {
      parsedQuestions = JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      console.log(cleanedText);

      return NextResponse.json(
        {
          success: false,
          message: "Gemini returned invalid JSON.",
        },
        { status: 500 }
      );
    }

    const interview = await prisma.interview.create({
      data: {
        jobRole,
        experience,
        techStack,
        description,
        questions: parsedQuestions,
      },
    });

    console.log("Interview Saved:", interview);

    return NextResponse.json({
      success: true,
      interviewId: interview.id,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}