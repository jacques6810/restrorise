// Wheel.jsx
import { useState, useRef, useEffect } from "react";

const Wheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const options = [
    { label: "Truth", color: "#f87171" }, // Red
    { label: "Dare", color: "#60a5fa" }, // Blue
    { label: "Siapa Kami?", color: "#34d399" }, // Green
    { label: "Gambar", color: "#fbbf24" }, // Yellow
    { label: "Hots", color: "#a78bfa" }, // Purple
  ];

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    // Random number of full rotations (5-10) plus a random segment
    const segmentAngle = 360 / options.length;
    const extraRotation = Math.floor(Math.random() * 360);
    const fullRotations = 5 * 360 + extraRotation;

    // Calculate which segment we'll land on
    const totalRotation = rotation + fullRotations;
    const normalizedRotation = totalRotation % 360;
    const winningSegment =
      Math.floor((360 - normalizedRotation) / segmentAngle) % options.length;

    console.log("Spinning to segment", winningSegment);
    setRotation(totalRotation);

    // Apply the spin animation
    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
    }

    // Show result after spin completes
    setTimeout(() => {
      setResult(options[winningSegment].label);
      setSpinning(false);

      // Reset transition for next spin
      if (wheelRef.current) {
        wheelRef.current.style.transition = "none";
      }
    }, 4000);
  };

  // Calculate the SVG path for each segment
  const getSegmentPath = (index, totalSegments, radius, width) => {
    const angle = (2 * Math.PI) / totalSegments;
    const startAngle = index * angle;
    const endAngle = (index + 1) * angle;

    const x1 = radius + radius * Math.cos(startAngle);
    const y1 = radius + radius * Math.sin(startAngle);
    const x2 = radius + radius * Math.cos(endAngle);
    const y2 = radius + radius * Math.sin(endAngle);

    return `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-purple-800 mb-8">
        Spin the Wheel!
      </h1>

      <div className="relative w-full max-w-md aspect-square mb-12">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full shadow-xl relative overflow-hidden"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {options.map((option, index) => (
              <path
                key={index}
                d={getSegmentPath(index, options.length, 100, 200)}
                fill={option.color.replace("bg-", "").replace("-", " ")} // Convert Tailwind class to color
              />
            ))}
            {options.map((option, index) => {
              const angle =
                (360 / options.length) * index + 360 / options.length / 2;
              const radian = (angle * Math.PI) / 180;
              const textX = 100 + 60 * Math.cos(radian);
              const textY = 100 + 60 * Math.sin(radian);

              return (
                <text
                  key={index}
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  transform={`rotate(${angle}, ${textX}, ${textY})`}
                  className="select-none"
                >
                  {option.label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Pointer */}
        {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <polygon points="12,2 22,22 2,22" fill="#ef4444" />
          </svg>
        </div> */}

        {/* Pointer */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-8 h-8">
          <svg viewBox="0 0 24 24" className="w-full h-full rotate-180">
            <polygon
              points="12,2 22,22 2,22"
              fill="#ef4444"
              transform="rotate(90, 12, 12)"
            />
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300 ${
          spinning
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
        }`}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>

      {/* Result Display */}
      {result && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg max-w-md w-full text-center animate-bounce-in">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            You got:
          </h2>
          <p className="text-4xl font-bold text-purple-600">{result}</p>
        </div>
      )}

      {/* Wheel segments info */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-2 w-full max-w-md">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-4 h-4 rounded-full ${option.color} mr-2`}></div>
            <span className="text-sm font-medium text-gray-700">
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wheel;
