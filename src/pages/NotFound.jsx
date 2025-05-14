import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaSadTear } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center max-w-lg w-full"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-6 mb-6 shadow-lg">
          <FaSadTear className="text-white text-6xl" />
        </div>
        <h1 className="text-4xl font-extrabold text-purple-700 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/spin")}
          className="flex items-center text-sm md:text-base gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          <FaArrowLeft />
          Kembali ke Login
        </motion.button>
      </motion.div>
      <footer className="mt-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Resprorise. All fun reserved.
      </footer>
    </div>
  );
};

export default NotFound;
