"use client";

interface Props {
  answer: string;
  setAnswer: (value: string) => void;
}

export default function AnswerBox({
  answer,
  setAnswer,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Your Answer
      </h2>

      <textarea
        rows={8}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}