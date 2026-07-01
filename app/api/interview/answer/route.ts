import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      interviewId,
      question,
      answer,
    } = body;

    if (!interviewId || !question || !answer) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const interviewAnswer = await prisma.interviewAnswer.create({
      data: {
        interviewId,
        question,
        answer,
      },
    });

    return NextResponse.json({
      success: true,
      answerId: interviewAnswer.id,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save answer",
      },
      { status: 500 }
    );
  }
}