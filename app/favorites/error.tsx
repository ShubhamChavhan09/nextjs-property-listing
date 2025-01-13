"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Failed to load favorites</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
