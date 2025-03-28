import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useMediaQuery } from "react-responsive";

const Home = () => {
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const wheelRef = useRef(null);
  //   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const options = [
    {
      label: "T",
      value: "Truth",
      color: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      label: "D",
      value: "Dare",
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      label: "S",
      value: "Siapa Kami",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
    },
    {
      label: "G",
      value: "Gambar",
      color: "bg-amber-400",
      textColor: "text-amber-500",
    },
    {
      label: "H",
      value: "Hots",
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    const degrees = Math.floor(1800 + Math.random() * 1800);

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      const segmentAngle = 360 / options.length;
      console.log("Setiap segmen:", segmentAngle, "derajat");
      const normalizedDegrees = degrees % 360;
      console.log("Derajat Putaran:", normalizedDegrees);
      const invertedDegrees = 360 - normalizedDegrees;
      console.log("Derajat Terbalik:", invertedDegrees);
      const winningSegment = Math.floor(invertedDegrees / segmentAngle);
      console.log("Segmen Menang:", winningSegment);

      setResult(options[winningSegment]);
    }, 4000);
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
            Spin & Challenge!
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
                className="w-full h-full rounded-full border-8 border-white shadow-lg relative overflow-hidden"
                style={{
                  background:
                    "conic-gradient(from 0deg, #EF4444 0% 20%, #3B82F6 20% 40%, #10B981 40% 60%, #F59E0B 60% 80%, #8B5CF6 80% 100%)",
                }}
                animate={isSpinning ? "spin" : "initial"}
                variants={wheelVariant}
              >
                {options.map((option, index) => {
                  const angle = (360 / options.length) * index;
                  return (
                    <div
                      key={index}
                      className="absolute w-1/2 h-1/2 origin-bottom-right"
                      style={{
                        transform: `rotate(${angle}deg) skewY(${
                          90 - 360 / options.length
                        }deg)`,
                        left: "0",
                        top: "0",
                      }}
                    >
                      <span
                        className={`absolute text-white font-bold text-xl ${option.textColor}`}
                        style={{
                          transform: `skewY(${
                            360 / options.length - 90
                          }deg) rotate(${360 / options.length / 2}deg)`,
                          bottom: "20px",
                          right: "20px",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        {option.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Wheel Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full z-10 border-4 border-gray-300 shadow-md flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600"></div>
              </div>

              {/* Pointer dengan animasi naik turun saja */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-12 border-r-12 border-b-20 border-l-transparent border-r-transparent border-b-red-500 z-20 rotate-180 "
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
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
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  🔄
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
                  <h2 className="text-2xl font-bold text-gray-800">
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
        © {new Date().getFullYear()} Spin & Challenge. All fun reserved.
      </motion.footer>
    </div>
  );
};

export default Home;
