import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InterviewClient from "@/components/InterviewClient";

interface InterviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewPage({
  params,
}: InterviewPageProps) {
  const { id } = await params;

  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
  });

  if (!interview) {
    notFound();
  }

  return (
    <InterviewClient
  interviewId={interview.id}
  questions={interview.questions as any}
  />
  );
}