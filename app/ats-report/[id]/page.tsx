import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ATSReportPage({
  params,
}: Props) {
  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: {
      id,
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold">
            ATS Resume Report
          </h1>

          <p className="text-gray-500 mt-2">
            AI Resume Analysis
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-blue-100 rounded-xl p-6">
              <h2 className="font-semibold">
                ATS Score
              </h2>

              <p className="text-5xl font-bold mt-4">
                {resume.atsScore ?? "--"}
              </p>
            </div>

            <div className="bg-green-100 rounded-xl p-6">
              <h2 className="font-semibold">
                Resume
              </h2>

              <p className="text-lg mt-4">
                {resume.fileName}
              </p>
            </div>

            <div className="bg-yellow-100 rounded-xl p-6">
              <h2 className="font-semibold">
                Uploaded
              </h2>

              <p className="text-lg mt-4">
                {resume.createdAt.toLocaleDateString()}
              </p>
            </div>

          </div>

          <div className="bg-white border rounded-xl mt-10 p-8">

            <h2 className="text-2xl font-bold mb-5">
              Resume Content
            </h2>

            <div className="whitespace-pre-wrap text-gray-700">
              {resume.content}
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}