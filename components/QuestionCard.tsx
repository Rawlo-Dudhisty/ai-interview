interface Props {
  question: string;
  current: number;
  total: number;
}

export default function QuestionCard({
  question,
  current,
  total,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          Question {current}
        </span>

        <span className="text-gray-500">
          {current} / {total}
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 leading-relaxed">
        {question}
      </h2>
    </div>
  );
}