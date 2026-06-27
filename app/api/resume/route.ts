import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { content, fileName, userId } = body;

    const resume = await prisma.resume.create({
      data: {
        content,
        fileName,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save resume",
      },
      { status: 500 }
    );
  }
}