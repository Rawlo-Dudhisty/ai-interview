import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-4">
        AI Recruiter Platform
      </h1>

      <p className="text-gray-500 mb-8 text-center">
        Resume ATS Analysis • AI Interviews • Candidate Evaluation
      </p>

      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Dashboard
        </Link>

        <Link
          href="/sign-in"
          className="px-6 py-3 border rounded-lg"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}