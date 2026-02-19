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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md shadow-xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl bg-white"
          style={{
            border: `6px solid ${segment.color}`,
          }}
        >
          {/* Card content */}
          <div className="relative h-full min-h-[550px] flex flex-col p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <span
                className="text-sm font-semibold"
                style={{ color: segment.color }}
              >
                {segment.title}
              </span>
              <span className="text-sm" style={{ color: segment.color }}>
                #{card.id}
              </span>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {segment.title !== "Gambar" && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                  style={{ color: segment.color }}
                >
                  {React.cloneElement(segment.icon, {
                    className: "text-8xl opacity-90",
                  })}
                </motion.div>
              )}

              {segment.title !== "Gambar" && (
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ color: segment.color }}
                >
                  {card.content}
                </h3>
              )}

              {segment.title === "Gambar" ? (
                <>
                  <img
                    src={card.image}
                    alt={card.content}
                    className="max-w-80 max-h-80 object-contain rounded-lg shadow-md mb-6"
                    style={{ border: `4px solid ${segment.color}` }}
                  />
                  <div className="w-full flex flex-col items-center">
                    {!showAnswer ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowAnswer(true)}
                        className="px-6 py-2 text-white rounded-full font-semibold shadow-lg mb-4 transition"
                        style={{ backgroundColor: segment.color }}
                      >
                        Reveal Answer
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-semibold text-xl mb-6 px-4 py-2 rounded-xl text-center"
                        style={{ color: segment.color }}
                      >
                        Answer: {card.content}
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p
                    className="text-lg text-opacity-90 mb-6"
                    style={{ color: segment.color }}
                  >
                    {card.details}
                  </p>
                  {segment.title === "Siapa Aku?" && (
                    <div className="w-full flex flex-col items-center">
                      {!showAnswer ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setShowAnswer(true)}
                          className="px-6 py-2 text-white rounded-full font-semibold shadow-lg mb-4 transition"
                          style={{ backgroundColor: segment.color }}
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
                          className="font-semibold text-lg text-opacity-90 mb-6 px-4 py-2 rounded-xl"
                          style={{ color: segment.color }}
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
                className="px-6 py-2 rounded-full font-semibold shadow-lg text-white"
                style={{ backgroundColor: segment.color }}
              >
                Got It!
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CardModal;
