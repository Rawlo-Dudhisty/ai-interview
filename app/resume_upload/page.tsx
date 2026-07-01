"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeUploadPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      // Upload Resume
      const uploadResponse = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      console.log("Upload:", uploadResult);

      if (!uploadResult.success) {
        alert(uploadResult.message);
        return;
      }

      // Analyze Resume with Gemini
      const analyzeResponse = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: uploadResult.resumeId,
        }),
      });

      const analyzeResult = await analyzeResponse.json();

      console.log("Analysis:", analyzeResult);

      if (!analyzeResult.success) {
        alert(analyzeResult.message);
        return;
      }

      router.push(`/ats-report/${uploadResult.resumeId}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-xl">

        <h1 className="text-3xl font-bold">
          AI Resume Analyzer
        </h1>

        <p className="text-gray-500 mt-2">
          Upload your resume to receive an AI-powered ATS report.
        </p>

        <div className="mt-8">
          <input
            type="file"
            accept=".docx"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {file && (
          <div className="mt-4 bg-slate-100 rounded-lg p-3">
            <p className="font-semibold">Selected File</p>
            <p>{file.name}</p>
          </div>
        )}

        <button
          onClick={uploadResume}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
        >
          {loading ? "Analyzing Resume..." : "Upload & Analyze Resume"}
        </button>

      </div>
    </main>
  );
}