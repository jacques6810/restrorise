import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CardModal = ({ card, segment, onClose }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-md shadow-xl"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className={`relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white ${segment.color}`}
        >
          {/* Card content */}
          <div className="relative h-full min-h-[550px] flex flex-col p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <span className={`text-sm font-semibold text-white`}>
                {segment.title}
              </span>
              <span className="text-sm text-white">#{card.id}</span>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {segment.title !== "Gambar" && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  {React.cloneElement(segment.icon, {
                    className: "text-8xl text-white opacity-90",
                  })}
                </motion.div>
              )}

              {segment.title !== "Gambar" && (
                <h3 className="text-3xl font-bold text-white mb-4">
                  {card.content}
                </h3>
              )}

              {segment.title === "Gambar" ? (
                <img
                  src={card.image}
                  alt={card.content}
                  className="max-w-80 max-h-80 object-contain rounded-lg shadow-md bg-white mb-6"
                />
              ) : (
                <>
                  <p className="text-white text-lg text-opacity-90 mb-6">
                    {card.details}
                  </p>
                  {segment.title === "Siapa Aku?" && (
                    <div className="w-full flex flex-col items-center">
                      {!showAnswer ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setShowAnswer(true)}
                          className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-semibold shadow-lg mb-4 transition"
                        >
                          Reveal Answer
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setShowAnswer(false)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-white font-semibold text-lg text-opacity-90 mb-6 px-4 py-2 rounded-xl"
                        >
                          Answer: {card.answer}
                        </motion.button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2 bg-white rounded-full font-semibold shadow-lg"
              >
                <span className={`${segment.textColor}`}>Got It!</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CardModal;
