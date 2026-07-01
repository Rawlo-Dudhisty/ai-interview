interface Props {
  current: number;
  total: number;
}

export default function InterviewHeader({
  current,
  total,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">
          AI Interview
        </h1>

        <p className="text-gray-500">
          Question {current} of {total}
        </p>
      </div>

      <div className="text-red-500 font-bold text-2xl">
        25:00
      </div>
    </div>
  );
}