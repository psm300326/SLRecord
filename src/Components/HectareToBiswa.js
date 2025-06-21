import { useState } from "react";

export default function HectareToBiswa() {
 const [hectare, setHectare] = useState("");
  const [biswa, setBiswa] = useState(null);

  const convertToBiswa = () => {
    const h = parseFloat(hectare);
    if (!isNaN(h)) {
      const result = h * 79.732668;
      setBiswa(result.toFixed(2));
    } else {
      setBiswa(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Hectare to Biswa Converter</h1>
        <div className="mb-4">
          <p><label className="block mb-1 font-medium">Hectares to biswa UP</label></p>
          <input
            type="number"
            value={hectare}
            onChange={(e) => setHectare(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter area in hectares"
          />
        </div>
        <button
          onClick={convertToBiswa}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
        >
          Convert
        </button>

        {biswa !== null && (
          <div className="mt-4 text-center text-lg font-semibold">
            {hectare} Hectare = {biswa} Biswa
          </div>
        )}
      </div>
    </main>
  );
}