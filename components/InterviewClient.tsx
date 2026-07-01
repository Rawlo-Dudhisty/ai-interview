"use client";

import { useState } from "react";
import InterviewHeader from "@/components/InterviewHeader";
import QuestionCard from "@/components/QuestionCard";
import AnswerBox from "@/components/AnswerBox";
import NavigationButtons from "@/components/NavigationButtons";
import SpeechRecorder from "@/components/SpeechRecorder";
import WebcamPreview from "@/components/WebcamPreview";
import InterviewTimer from "@/components/InterviewTimer";

interface Question {
  question: string;
  answer: string;
}

interface InterviewClientProps {
  interviewId: string;
  questions: Question[];
}

export default function InterviewClient({
  interviewId,
  questions,
}: InterviewClientProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const saveAnswer = async () => {
    if (!userAnswer.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/interview/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interviewId,
          question: questions[currentQuestion].question,
          answer: userAnswer,
        }),
      });

      const result = await response.json();

      console.log("Answer Saved:", result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = async () => {
    await saveAnswer();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setUserAnswer("");
    } else {
      alert("Interview Completed!");
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setUserAnswer("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <InterviewHeader
          current={currentQuestion + 1}
          total={questions.length}
        />
        <div className="mt-4">
        <InterviewTimer
    minutes={25}
    onTimeUp={() => {
      alert("Interview Time Completed!");
    }}
  />
</div>
        <QuestionCard
          question={questions[currentQuestion].question}
          current={currentQuestion + 1}
          total={questions.length}
        />

        <div className="grid md:grid-cols-2 gap-6 mt-6">

  <WebcamPreview />

  <div className="space-y-4">

    <SpeechRecorder
      onTranscript={(text) => setUserAnswer(text)}
    />

    <AnswerBox
      answer={userAnswer}
      setAnswer={setUserAnswer}
    />

  </div>

</div>

        <NavigationButtons
          onPrevious={previousQuestion}
          onNext={nextQuestion}
          disablePrevious={currentQuestion === 0}
          disableNext={loading}
        />

      </div>
    </div>
  );
}