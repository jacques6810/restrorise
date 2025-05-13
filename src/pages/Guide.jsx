import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaGamepad,
  FaSync,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

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
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white relative z-10">
            <span className="inline-block mr-2">🎡</span>
            RESPRORISE
            <span className="inline-block ml-2">🎲</span>
          </h1>
          <p className="text-white/80 mt-2 relative z-10">
            Berikut adalah panduan cara bermain di Resprorise!{" "}
          </p>
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
