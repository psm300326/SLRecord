import { useState } from "react";

export default function Home() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [area, setArea] = useState(null);

  const calculateArea = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!isNaN(l) && !isNaN(w)) {
      setArea(l * w);
    } else {
      setArea(null);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Land Area Calculator</h1>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Length (in ft)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Width (in ft)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={calculateArea}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Calculate Area
        </button>

        {area !== null && (
          <div className="mt-4 text-lg font-semibold text-center">
            Total Area: {area} sq ft
          </div>
        )}
      </div>
    </main>
  );
}