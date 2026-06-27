import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        AI Recruiter Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold">
            Resume Upload
          </h2>
          <p>Upload and analyze resumes.</p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold">
            ATS Analyzer
          </h2>
          <p>Get ATS score and feedback.</p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold">
            AI Interview
          </h2>
          <p>Practice AI-powered interviews.</p>
        </div>
      </div>
    </div>
  );
}