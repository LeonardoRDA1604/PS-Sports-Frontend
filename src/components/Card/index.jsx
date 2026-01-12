export function Card({ title, value }) {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-5 shadow rounded text-center hover:shadow-lg transition-shadow duration-200">
      <p className="text-gray-600 text-xs sm:text-sm md:text-base truncate">
        {title}
      </p>
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900 mt-2">
        {value}
      </p>
    </div>
  );
}
