
export function Card({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded text-center">
      <p className="text-gray-600">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}