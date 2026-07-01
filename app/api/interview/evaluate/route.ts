import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { interviewId } = await req.json();

    // Get interview
    const interview = await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },
      include: {
        answers: true,
      },
    });

    if (!interview) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview not found",
        },
        { status: 404 }
      );
    }

    const prompt = `
You are a Senior Software Engineering Interviewer.

Evaluate this interview.

Job Role:
${interview.jobRole}

Experience:
${interview.experience}

Questions:
${JSON.stringify(interview.questions)}

Candidate Answers:
${JSON.stringify(interview.answers)}

Return ONLY valid JSON.

{
  "overallScore":85,
  "technicalScore":90,
  "communicationScore":82,
  "confidenceScore":84,
  "strengths":[
    "Strong React knowledge",
    "Good API understanding"
  ],
  "improvements":[
    "Practice System Design",
    "Give more detailed explanations"
  ],
  "feedback":"Overall good performance."
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

    const evaluation = JSON.parse(text);

    // Save evaluation
    await prisma.interviewEvaluation.create({
      data: {
        interviewId,

        overallScore: evaluation.overallScore,
        technicalScore: evaluation.technicalScore,
        communicationScore: evaluation.communicationScore,
        confidenceScore: evaluation.confidenceScore,

        strengths: evaluation.strengths,
        improvements: evaluation.improvements,

        feedback: evaluation.feedback,
      },
    });

    return NextResponse.json({
      success: true,
      evaluation,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Evaluation failed",
      },
      {
        status: 500,
      }
    );
  }
}