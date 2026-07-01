interface Props {
  title: string;
  score: number;
}

export default function ScoreCard({
  title,
  score,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-600">
        {title}
      </h2>

      <p className="text-5xl font-bold text-blue-600 mt-4">
        {score}
      </p>

      <p className="text-gray-500 mt-2">
        out of 100
      </p>
    </div>
  );
}