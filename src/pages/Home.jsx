import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useMediaQuery } from "react-responsive";

const Home = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const wheelRef = useRef(null);
  //   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const options = [
    {
      label: "T",
      value: "Truth",
      fullLabel: "Truth",
      color: "#f87171",
      textColor: "text-red-500",
    }, // Red
    {
      label: "D",
      value: "Dare",
      fullLabel: "Dare",
      color: "#60a5fa",
      textColor: "text-blue-500",
    }, // Blue
    {
      label: "S",
      value: "Siapa Kami?",
      fullLabel: "Siapa Kami",
      color: "#34d399",
      textColor: "text-green-500",
    }, // Green
    {
      label: "G",
      value: "Gambar",
      fullLabel: "Gambar",
      color: "#fbbf24",
      textColor: "text-yellow-500",
    }, // Yellow
    {
      label: "H",
      value: "Hots",
      fullLabel: "Hots",
      color: "#a78bfa",
      textColor: "text-purple-500",
    }, // Purple
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
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
      setIsSpinning(false);

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
    spin: {
      rotate: 1800,
      transition: {
        duration: 4,
        ease: [0.17, 0.67, 0.21, 0.99],
      },
    },
    initial: { rotate: 0 },
  };

  const resultVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const guideVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-200 opacity-20"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-200 opacity-20"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white relative z-10">
            <span className="inline-block mr-2">🎡</span>
            RESTRORISE
            <span className="inline-block ml-2">🎲</span>
          </h1>
          <p className="text-white/80 mt-2 relative z-10">
            Putar roda untuk mendapatkan tantangan!
          </p>
        </div>

        <div className="p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8">
          {/* Wheel Section */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
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

              {/* Wheel Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full z-10 border-4 border-gray-300 shadow-md flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600"></div>
              </div>

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

            <motion.button
              onClick={spinWheel}
              disabled={isSpinning}
              whileHover={!isSpinning ? { scale: 1.05 } : {}}
              whileTap={!isSpinning ? { scale: 0.95 } : {}}
              className={`px-8 py-4 text-xl font-bold rounded-full shadow-lg relative overflow-hidden ${
                isSpinning
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              }`}
            >
              {isSpinning ? (
                <motion.span className="inline-flex items-center space-x-1 h-6">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block w-2 h-2 bg-white rounded-full"
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.span>
              ) : (
                "PUTAR RODA!"
              )}
            </motion.button>
          </div>

          {/* Result Section */}
          <div className="flex-1 w-full max-w-md">
            <AnimatePresence>
              {result && (
                <motion.div
                  variants={resultVariant}
                  initial="hidden"
                  animate="visible"
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Hasil Putaran:
                  </h3>
                  <div
                    className={`text-3xl font-bold ${result.textColor} flex items-center gap-3`}
                  >
                    <span className="text-4xl">
                      {result.label === "T" && "🤔"}
                      {result.label === "D" && "😈"}
                      {result.label === "S" && "👥"}
                      {result.label === "G" && "🖼️"}
                      {result.label === "H" && "🔥"}
                    </span>
                    {result.value}{" "}
                    <span className="text-gray-400">({result.label})</span>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Apa yang harus dilakukan:
                    </h4>
                    <p className="text-gray-600">
                      {result.label === "T" &&
                        "Jawablah pertanyaan jujur dari temanmu!"}
                      {result.label === "D" &&
                        "Lakukan tantangan yang diberikan temanmu!"}
                      {result.label === "S" &&
                        "Kenali lebih jauh tentang pembuat permainan ini!"}
                      {result.label === "G" &&
                        "Ambil foto atau gambar sesuai tema yang ditentukan!"}
                      {result.label === "H" &&
                        "Lakukan tantangan khusus yang lebih menantang!"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setShowGuide(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Panduan Permainan
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGuide(false)}
          >
            <motion.div
              variants={guideVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowGuide(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Panduan Permainan
                  </h2>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      icon: "🔄",
                      title: "Cara Memutar Roda",
                      content:
                        'Klik tombol "PUTAR RODA!" untuk memulai permainan. Roda akan berputar secara acak dan berhenti pada salah satu pilihan.',
                    },
                    {
                      icon: "🎯",
                      title: "Pilihan yang Tersedia",
                      content: (
                        <ul className="mt-2 space-y-3">
                          {options.map((opt) => (
                            <li
                              key={opt.label}
                              className="flex items-start gap-2"
                            >
                              <span className={`font-bold ${opt.textColor}`}>
                                {opt.label}
                              </span>
                              <span className="text-gray-700">
                                - {opt.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ),
                    },
                    {
                      icon: "🏆",
                      title: "Setelah Mendapat Hasil",
                      content:
                        "Ikuti instruksi sesuai dengan pilihan yang Anda dapatkan. Anda bisa memutar roda lagi untuk tantangan berikutnya.",
                    },
                    {
                      icon: "👥",
                      title: "Mode Bermain",
                      content:
                        "Permainan ini bisa dimainkan sendiri atau bersama teman. Jika bermain bersama, bergantianlah dalam memutar roda.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-gray-600">{item.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => setShowGuide(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Mengerti, Mulai Bermain!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} Restrorise. All fun reserved.
      </motion.footer>
    </div>
  );
};

export default Home;
