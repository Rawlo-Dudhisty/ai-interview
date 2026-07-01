import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    let resumeText = "";

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await mammoth.extractRawText({
        buffer,
      });

      resumeText = result.value;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Only DOCX files are supported.",
        },
        {
          status: 400,
        }
      );
    }

    const resume = await prisma.resume.create({
      data: {
        fileName: file.name,
        content: resumeText,
        atsScore: 0,
      },
    });

    console.log("Saved Resume ID:", resume.id);

    return NextResponse.json({
      success: true,
      resumeId: resume.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Resume upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}