import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const interviews = await prisma.interview.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const totalInterviews = await prisma.interview.count();

  const stats = [
    {
      title: "Total Interviews",
      value: totalInterviews,
    },
    {
      title: "Completed",
      value: totalInterviews,
    },
    {
      title: "Average Score",
      value: "--",
    },
    {
      title: "Pending",
      value: "0",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Platform
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back 👋
            </p>
          </div>

          <Link
            href="/dashboard/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            + Create Interview
          </Link>

        </div>
      </header>

      <section className="max-w-7xl mx-auto p-8">

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6">

          {stats.map((item) => (

            <div
              key={item.title}
              className="bg-white rounded-xl shadow p-6"
            >

              <p className="text-gray-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>

            </div>

          ))}

        </div>

        {/* Recent Interviews */}

        <div className="mt-10 bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Recent Interviews
            </h2>

            <Link
              href="/dashboard/history"
              className="text-blue-600 font-medium"
            >
              View All →
            </Link>

          </div>

          <div className="mt-6 space-y-4">

            {interviews.length === 0 ? (

              <div className="text-center py-10 text-gray-500">
                No interviews created yet.
              </div>

            ) : (

              interviews.map((item) => (

                <div
                  key={item.id}
                  className="border rounded-lg p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-semibold text-lg">
                      {item.jobRole}
                    </h3>

                    <p className="text-gray-500">
                      {item.experience} Years Experience
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      {item.createdAt.toLocaleDateString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-green-600">
                      Completed
                    </p>

                    <Link
                      href={`/dashboard/report/${item.id}`}
                      className="text-blue-600 text-sm"
                    >
                      View Report
                    </Link>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <Link
            href="/dashboard/create"
            className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold">
              🎤 Start Interview
            </h3>

            <p className="text-gray-500 mt-2">
              Practice AI-generated interview questions.
            </p>
          </Link>

          <Link
            href="/dashboard/history"
            className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold">
              📊 Interview History
            </h3>

            <p className="text-gray-500 mt-2">
              Review previous interview sessions.
            </p>
          </Link>

          <Link
            href="/resume_upload"
            className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold">
              📄 Resume Analyzer
            </h3>

            <p className="text-gray-500 mt-2">
              Upload your resume and get AI feedback.
            </p>
          </Link>

        </div>

      </section>

    </main>
  );
}