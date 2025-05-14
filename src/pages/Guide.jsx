import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaGamepad,
  FaSync,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import logoDSI from "../assets/DSI Logo.png"; // Import logo DSI

const Guide = () => {
  const navigate = useNavigate();

  const guideItems = [
    {
      icon: <FaSync className="text-3xl text-purple-600" />,
      title: "Cara Memutar Roda",
      description:
        'Klik tombol "PUTAR RODA!" untuk memulai permainan. Roda akan berputar secara acak dan berhenti pada salah satu pilihan.',
    },
    {
      icon: <FaGamepad className="text-3xl text-blue-600" />,
      title: "Pilihan yang Tersedia",
      description:
        "Terdapat 5 pilihan tantangan: Truth, Dare, Siapa Aku, Gambar, dan Hots. Setiap pilihan memiliki isi konten yang berbeda-beda.",
    },
    {
      icon: <FaTrophy className="text-3xl text-yellow-600" />,
      title: "Setelah Mendapat Hasil",
      description:
        "Ikuti instruksi sesuai dengan pilihan yang Anda dapatkan. Bermainlah dengan jujur dan penuh semangat!",
    },
    {
      icon: <FaUsers className="text-3xl text-green-600" />,
      title: "Mode Bermain",
      description:
        "Permainan ini lebih seru dimainkan bersama teman. Bergantianlah memutar roda dan selesaikan tantangan yang diberikan.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Header Section with Enhanced Design */}
        <div className="relative bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-center overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20 mix-blend-overlay"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500 rounded-full filter blur-3xl opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-pink-400 rounded-full filter blur-3xl opacity-15 mix-blend-overlay"></div>
          </div>

          {/* Logo with Floating Animation */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-6"
            >
              <img
                src={logoDSI}
                alt="DSI Logo"
                className="h-24 w-auto drop-shadow-lg bg-white rounded-full p-2 border-4 border-white/20"
                style={{
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Title with Animated Emojis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <motion.span
                animate={{
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block mr-3"
              >
                🎡
              </motion.span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-100 to-white">
                RESPRORISE
              </span>
              <motion.span
                animate={{
                  rotate: [0, -15, 15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
                className="inline-block ml-3"
              >
                🎲
              </motion.span>
            </h1>

            {/* Subtitle with Floating Dots */}
            <div className="relative inline-block">
              <p className="text-white/90 mt-2 text-lg md:text-xl relative z-10">
                Berikut adalah panduan cara bermain di Resprorise!
              </p>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -bottom-2 -left-4 w-2 h-2 bg-yellow-300 rounded-full"
              ></motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                }}
                className="absolute -top-2 -right-4 w-3 h-3 bg-pink-300 rounded-full"
              ></motion.div>
            </div>
          </motion.div>

          {/* Animated Confetti Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -50],
                x: Math.random() * 100 - 50,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className={`absolute w-2 h-2 rounded-full ${
                ["bg-yellow-300", "bg-pink-300", "bg-white", "bg-purple-300"][
                  i % 4
                ]
              }`}
              style={{
                top: `${Math.random() * 30 + 10}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></motion.div>
          ))}
        </div>

        {/* Guide Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col items-center text-center"
            >
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer with Action Button */}
        <div className="px-6 pb-8 pt-4 text-center">
          <motion.button
            onClick={() => navigate("/spin")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-2 mx-auto"
          >
            Mulai Bermain
            <FaArrowRight />
          </motion.button>
        </div>
      </motion.div>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} Resprorise. All fun reserved.
      </motion.footer>
    </div>
  );
};

export default Guide;
