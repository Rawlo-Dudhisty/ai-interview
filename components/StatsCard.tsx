interface Props {
  title: string;
  value: number | string;
  color: string;
}

export default function StatsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-gray-500 text-lg">
        {title}
      </h2>

      <p className={`text-4xl font-bold mt-4 ${color}`}>
        {value}
      </p>
    </div>
  );
}