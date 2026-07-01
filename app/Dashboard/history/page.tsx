import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HistoryPage() {
  const interviews = await prisma.interview.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold">
          Interview History
        </h1>

        <p className="text-gray-500 mt-2">
          All your AI interviews.
        </p>

        <div className="mt-8 space-y-4">

          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {interview.jobRole}
                </h2>

                <p className="text-gray-500">
                  {interview.experience} Years Experience
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  {interview.createdAt.toLocaleDateString()}
                </p>
              </div>

              <Link
                href={`/dashboard/report/${interview.id}`}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                View Report
              </Link>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}