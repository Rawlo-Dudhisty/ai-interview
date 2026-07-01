"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInterviewPage() {
  const [formData, setFormData] = useState({
    jobRole: "",
    experience: "",
    techStack: "",
    description: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (
      !formData.jobRole ||
      !formData.experience ||
      !formData.techStack ||
      !formData.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("API Response:", result);
      alert(JSON.stringify(result));

      if (result.success) {
      router.push(`/dashboard/interview/${result.interviewId}`);
      } else {
      alert(result.message);
   }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-5xl mx-auto py-10">

        <h1 className="text-4xl font-bold text-gray-900">
          Create AI Interview
        </h1>

        <p className="text-gray-600 mt-2">
          Generate personalized interview questions using AI.
        </p>

        <div className="bg-white rounded-xl shadow-lg mt-8 p-8 space-y-6">

          <div>
            <label className="font-semibold text-gray-800">
              Job Role
            </label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              placeholder="Frontend Developer"
              value={formData.jobRole}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  jobRole: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800">
              Experience
            </label>

            <input
              className="w-full mt-2 border rounded-lg p-3"
              placeholder="2 Years"
              value={formData.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800">
              Tech Stack
            </label>

            <textarea
              rows={4}
              className="w-full mt-2 border rounded-lg p-3"
              placeholder="React, Next.js, Node.js..."
              value={formData.techStack}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  techStack: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800">
              Job Description
            </label>

            <textarea
              rows={6}
              className="w-full mt-2 border rounded-lg p-3"
              placeholder="Paste job description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
          >
            {loading ? "Generating..." : "Generate Interview"}
          </button>

        </div>

      </div>
    </div>
  );
}