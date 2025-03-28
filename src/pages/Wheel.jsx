import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Wheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const wheelRef = useRef(null);

  const options = [
    {
      label: "T",
      fullLabel: "Truth",
      color: "#f87171",
      textColor: "text-red-500",
    }, // Red
    {
      label: "D",
      fullLabel: "Dare",
      color: "#60a5fa",
      textColor: "text-blue-500",
    }, // Blue
    {
      label: "S",
      fullLabel: "Siapa Kami",
      color: "#34d399",
      textColor: "text-green-500",
    }, // Green
    {
      label: "G",
      fullLabel: "Gambar",
      color: "#fbbf24",
      textColor: "text-yellow-500",
    }, // Yellow
    {
      label: "H",
      fullLabel: "Hots",
      color: "#a78bfa",
      textColor: "text-purple-500",
    }, // Purple
  ];

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const segmentAngle = 360 / options.length;
    const extraRotation = Math.floor(Math.random() * 360);
    const fullRotations = 5 * 360 + extraRotation;
    const totalRotation = rotation + fullRotations;
    const normalizedRotation = totalRotation % 360;
    const winningSegment =
      Math.floor((360 - normalizedRotation) / segmentAngle) % options.length;

    setRotation(totalRotation);

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
    }

    setTimeout(() => {
      setResult({
        label: options[winningSegment].label,
        value: options[winningSegment].fullLabel,
        textColor: options[winningSegment].textColor,
      });
      setSpinning(false);

      if (wheelRef.current) {
        wheelRef.current.style.transition = "none";
      }
    }, 4000);
  };

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

  // Animation variants
  const wheelVariant = {
    initial: { rotate: 0 },
    spin: { rotate: 360 * 5 }, // 5 full rotations
  };

  const resultVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const guideVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold text-purple-800 mb-2">
          Spin & Challenge!
        </h1>
        <p className="text-lg text-purple-600">
          Putar roda untuk mendapatkan tantangan!
        </p>
      </motion.div>

      <div className="relative w-full max-w-md aspect-square mb-8">
        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          className="w-full h-full rounded-full shadow-xl relative overflow-hidden"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {options.map((option, index) => (
              <path
                key={index}
                d={getSegmentPath(index, options.length, 100, 200)}
                fill={option.color}
              />
            ))}
            {options.map((option, index) => {
              const angle =
                (360 / options.length) * index + 360 / options.length / 2;
              const radian = (angle * Math.PI) / 180;
              const textX = 100 + 70 * Math.cos(radian);
              const textY = 100 + 70 * Math.sin(radian);

              return (
                <text
                  key={index}
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  transform={`rotate(${angle}, ${textX}, ${textY})`}
                  className="select-none"
                >
                  {option.label}
                </text>
              );
            })}
          </svg>
        </motion.div>

        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
          </div>
        </div>

        {/* Pointer */}
        {/* <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-10"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <polygon points="12,2 22,22 2,22" fill="#ef4444" />
          </svg>
        </motion.div> */}
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

      {/* Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-6 bg-white rounded-xl shadow-lg max-w-md w-full text-center mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Hasil Putaran:
            </h2>
            <p className={`text-3xl font-bold ${result.textColor}`}>
              {result.value} ({result.label})
            </p>
            {result.label === "S" && (
              <p className="mt-2 text-gray-600">
                Kenali lebih jauh tentang pembuat permainan ini!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spin Button */}
      <motion.button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg mb-6 ${
          spinning
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
        whileHover={!spinning ? { scale: 1.05 } : {}}
        whileTap={!spinning ? { scale: 0.95 } : {}}
      >
        {spinning ? "Memutar..." : "PUTAR RODA!"}
      </motion.button>

      {/* Guide Button */}
      <motion.button
        onClick={() => setShowGuide(!showGuide)}
        className="px-6 py-2 rounded-full bg-white text-purple-600 font-medium shadow mb-4"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {showGuide ? "Tutup Panduan" : "Panduan Permainan"}
      </motion.button>

      {/* Game Guide */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md mb-8"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Panduan Permainan
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    1. Cara Memutar Roda
                  </h3>
                  <p className="text-gray-600">
                    Klik tombol "PUTAR RODA!" untuk memulai permainan. Roda akan
                    berputar secara acak dan berhenti pada salah satu pilihan.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    2. Pilihan yang Tersedia
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>T - Truth (Pertanyaan jujur)</li>
                    <li>D - Dare (Tantangan)</li>
                    <li>S - Siapa Kami (Tentang pembuat game)</li>
                    <li>G - Gambar (Tantangan menggambar)</li>
                    <li>H - Hots (Tantangan seru)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    3. Setelah Mendapat Hasil
                  </h3>
                  <p className="text-gray-600">
                    Ikuti instruksi sesuai dengan pilihan yang Anda dapatkan.
                    Anda bisa memutar roda lagi untuk tantangan berikutnya.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    4. Mode Bermain
                  </h3>
                  <p className="text-gray-600">
                    Permainan ini bisa dimainkan sendiri atau bersama teman.
                    Jika bermain bersama, bergantianlah dalam memutar roda.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        className="text-center text-gray-500 text-sm mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} Spin & Challenge. All fun reserved.
      </motion.div>
    </div>
  );
};

export default Wheel;
