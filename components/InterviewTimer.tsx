"use client";

import { useEffect, useState } from "react";

interface Props {
  minutes: number;
  onTimeUp: () => void;
}

export default function InterviewTimer({
  minutes,
  onTimeUp,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 text-center">
      <h2 className="text-lg font-semibold">
        Time Remaining
      </h2>

      <p className="text-3xl font-bold text-red-600 mt-2">
        {String(mins).padStart(2, "0")}:
        {String(secs).padStart(2, "0")}
      </p>
    </div>
  );
}