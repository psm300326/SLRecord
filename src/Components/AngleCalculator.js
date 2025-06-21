import { useEffect, useRef, useState } from "react";

export default function AngleCalculator() {
  const [sides, setSides] = useState({
    AB: "",
    BC: "",
    CD: "",
    DA: "",
  });

  const canvasRef = useRef(null);

  const handleChange = (side, value) => {
    setSides((prev) => ({ ...prev, [side]: parseFloat(value) || "" }));
  };

  const isValid = Object.values(sides).every((v) => v > 0);

  const calculateArea = () => {
    const { AB, BC, CD, DA } = sides;
    if (AB === CD && BC === DA) {
      return AB * BC;
    }
    return ((AB + CD) / 2) * ((BC + DA) / 2);
  };

  const calculateBiswa = (area) => area / 1250;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isValid) return;

    const { AB, BC, CD, DA } = sides;
    const scale = 3;
    const top = AB * scale;
    const right = BC * scale;
    const bottom = CD * scale;
    const left = DA * scale;

    const startX = 100;
    const startY = 100;

    // Coordinates
    const A = [startX, startY];
    const B = [startX + top, startY];
    const C = [B[0], B[1] + right];
    const D = [A[0], A[1] + left];

    // Shape
    ctx.beginPath();
    ctx.moveTo(...A);
    ctx.lineTo(...B);
    ctx.lineTo(...C);
    ctx.lineTo(...D);
    ctx.closePath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3; 
    ctx.stroke();

    // Labels
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText("A", A[0] - 15, A[1] - 5);
    ctx.fillText("B", B[0] + 5, B[1] - 5);
    ctx.fillText("C", C[0] + 5, C[1] + 15);
    ctx.fillText("D", D[0] - 15, D[1] + 15);

    // Side lengths
    ctx.fillText(`${sides.AB} ft`, (A[0] + B[0]) / 2 - 10, A[1] - 15);
    ctx.fillText(`${sides.BC} ft`, B[0] + 10, (B[1] + C[1]) / 2);
    ctx.fillText(`${sides.CD} ft`, (C[0] + D[0]) / 2 - 10, C[1] + 20);
    ctx.fillText(`${sides.DA} ft`, A[0] - 45, (A[1] + D[1]) / 2);

    // Directions
    ctx.fillStyle = "blue";
    ctx.font = "13px Arial";

    ctx.fillText("East", (A[0] + B[0]) / 2 - 10, A[1] - 30);         // AB
    ctx.fillText("South", B[0] + 35, (B[1] + C[1]) / 2);             // BC
    ctx.fillText("West", (C[0] + D[0]) / 2 - 10, C[1] + 35);         // CD
    ctx.fillText("North", A[0] - 50, (A[1] + D[1]) / 2 + 10);        // DA
  }, [sides]);

  const totalArea = isValid ? calculateArea() : 0;
  const biswa = isValid ? calculateBiswa(totalArea) : 0;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Land Plot Layout (4 Sides)
        </h1>

        {isValid && (
          <div className="text-center font-semibold mb-4 text-blue-600">
            🪙 Biswa: {biswa.toFixed(2)} | 📏 Area: {totalArea.toFixed(2)} sq ft
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">A-B (East)</label>
            <input
              type="number"
              value={sides.AB}
              onChange={(e) => handleChange("AB", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Length in ft"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">B-C (South)</label>
            <input
              type="number"
              value={sides.BC}
              onChange={(e) => handleChange("BC", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Length in ft"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">C-D (West)</label>
            <input
              type="number"
              value={sides.CD}
              onChange={(e) => handleChange("CD", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Length in ft"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">D-A (North)</label>
            <input
              type="number"
              value={sides.DA}
              onChange={(e) => handleChange("DA", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Length in ft"
            />
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={1200}
          height={1200}
          className="border mx-auto"
        />
      </div>
    </main>
  );
}