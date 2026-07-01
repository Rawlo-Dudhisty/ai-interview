import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReportPage({ params }: Props) {
  const { id } = await params;

  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
    include: {
      answers: true,
    },
  });

  if (!interview) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center">
          AI Interview Report
        </h1>

        <p className="text-center text-gray-500 mt-2">
          {interview.jobRole}
        </p>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-blue-100 rounded-lg p-6">
            <h2 className="text-lg font-semibold">
              Experience
            </h2>

            <p className="text-3xl font-bold mt-3">
              {interview.experience} Years
            </p>
          </div>

          <div className="bg-green-100 rounded-lg p-6">
            <h2 className="text-lg font-semibold">
              Questions Answered
            </h2>

            <p className="text-3xl font-bold mt-3">
              {interview.answers.length}
            </p>
          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Candidate Answers
          </h2>

          {interview.answers.map((item, index) => (
            <div
              key={item.id}
              className="border rounded-lg p-6 mb-5"
            >
              <h3 className="font-semibold">
                Question {index + 1}
              </h3>

              <p className="mt-2">
                {item.question}
              </p>

              <div className="mt-4 bg-slate-100 rounded-lg p-4">
                {item.answer}
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}