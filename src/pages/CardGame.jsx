import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import CardModal from "./CardModal";
import "../App.css";

import { FaRegComment } from "react-icons/fa"; // For Truth
import { GiOpenBook } from "react-icons/gi"; // For Dare
import { FaUsers } from "react-icons/fa"; // For Siapa Aku
import { FaImage } from "react-icons/fa"; // For Gambar
import { FaFire } from "react-icons/fa"; // For Hots

const segmentData = {
  truth: {
    title: "Truth",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    textColor: "text-red-500",
    icon: <FaRegComment className="text-6xl text-white opacity-80" />,
    cards: Array(10)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        content: `Truth Question ${i + 1}`,
        details: "Answer honestly or face consequences!",
      })),
  },
  dare: {
    title: "Dare",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    textColor: "text-blue-500",
    icon: <GiOpenBook className="text-6xl text-white opacity-80" />,
    cards: Array(10)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        content: `Dare Challenge ${i + 1}`,
        details: "Complete this challenge or take a penalty!",
      })),
  },
  "siapa-aku": {
    title: "Siapa Aku?",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    textColor: "text-green-500",
    icon: <FaUsers className="text-6xl text-white opacity-80" />,
    cards: Array(10)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        content: `Siapa Aku Question ${i + 1}`,
        details: "Guess who this is about!",
      })),
  },
  gambar: {
    title: "Gambar",
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
    textColor: "text-yellow-500",
    icon: <FaImage className="text-6xl text-white opacity-80" />,
    cards: Array(10)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        content: `Gambar Challenge ${i + 1}`,
        details: "Draw or describe this image!",
      })),
  },
  hots: {
    title: "Hots",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    textColor: "text-purple-500",
    icon: <FaFire className="text-6xl text-white opacity-80" />,
    cards: Array(10)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        content: `Hot Challenge ${i + 1}`,
        details: "This one's spicy - good luck!",
      })),
  },
};

const CardGame = () => {
  const { segment } = useParams();
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState(Array(10).fill(false));
  const [shuffledCards, setShuffledCards] = useState([]);
  const currentSegment = segmentData[segment] || segmentData.truth;
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    setShuffledCards([...currentSegment.cards].sort(() => Math.random() - 0.5));
  }, [segment]);

  const handleCardClick = (index) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  const resetCards = () => {
    setFlippedCards(Array(10).fill(false));
    setShuffledCards([...currentSegment.cards].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`mb-8 p-4 sm:p-6 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-30 shadow-lg`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className={`p-3 rounded-full ${currentSegment.color} shadow-md`}
              >
                {React.cloneElement(currentSegment.icon, {
                  className: "text-4xl sm:text-5xl text-white",
                })}
              </motion.div>
              <div>
                <h1
                  className={`text-2xl sm:text-3xl font-extrabold ${currentSegment.textColor} drop-shadow-md`}
                >
                  {currentSegment.title} Cards
                </h1>
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  Pick a card and have fun!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetCards}
                className={`px-4 py-2 ${currentSegment.color} text-white rounded-xl font-bold shadow-lg ${currentSegment.hoverColor} transition flex items-center justify-center gap-2`}
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Shuffle Cards
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-white bg-opacity-90 rounded-xl font-medium shadow-lg hover:bg-opacity-100 transition flex items-center justify-center gap-2 border border-gray-200"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Wheel
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 justify-items-center">
          {shuffledCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: flippedCards[index] ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative aspect-[3/4] w-full max-w-[180px] md:max-w-[200px] lg:max-w-none lg:h-64 rounded-2xl shadow-xl cursor-pointer overflow-hidden ${
                flippedCards[index]
                  ? currentSegment.color
                  : currentSegment.color
              }`}
            >
              <AnimatePresence>
                {!flippedCards[index] ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    {/* <div className="absolute inset-0 bg-white/10 rounded-lg border-2 border-white/20"></div> */}
                    <div className="relative z-10 flex flex-col items-center">
                      {currentSegment.icon}
                      <span className="mt-4 text-white font-bold text-xl">
                        {currentSegment.title}
                      </span>
                    </div>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white"></div>
                      <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white"></div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-3 flex flex-col items-center justify-between"
                  >
                    <div className="w-full flex justify-between items-start">
                      <span className={`text-xs font-semibold text-white`}>
                        {currentSegment.title}
                      </span>
                      <span className="text-xs text-white">#{card.id}</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                        {card.content}
                      </h3>
                      <p className="text-xs md:text-sm text-white">
                        {card.details}
                      </p>
                    </div>

                    <div className="w-full flex justify-center">
                      {/* Inside the flipped card section (where the "See Your Card" button is) */}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(card);
                        }}
                        className={`text-xs px-4 py-1 rounded-full ${currentSegment.textColor} bg-white text-black font-semibold cursor-pointer hover:shadow-md transition`}
                      >
                        See Your Card
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className={`mt-8 p-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg border-2 border-white border-opacity-50`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${currentSegment.color} bg-opacity-20`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={currentSegment.textColor.replace("text-", "")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Cards flipped
                </p>
                <p className={`text-xl font-bold ${currentSegment.textColor}`}>
                  <span className="text-2xl">
                    {flippedCards.filter(Boolean).length}
                  </span>
                  <span className="mx-1 text-gray-400">/</span>
                  <span>{shuffledCards.length}</span>
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const allFlipped = flippedCards.every(Boolean);
                setFlippedCards(Array(10).fill(!allFlipped));
              }}
              className={`px-4 py-2 rounded-xl font-medium shadow-md transition flex items-center gap-2 ${
                flippedCards.every(Boolean)
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  : `${currentSegment.color} hover:${currentSegment.hoverColor} text-white`
              }`}
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
                  d={
                    flippedCards.every(Boolean)
                      ? "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      : "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  }
                />
              </svg>
              {flippedCards.every(Boolean) ? "Flip All Back" : "Flip All Cards"}
            </motion.button>
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${currentSegment.color}`}
              style={{
                width: `${
                  (flippedCards.filter(Boolean).length / shuffledCards.length) *
                  100
                }%`,
                transition: "width 0.5s ease",
              }}
            ></div>
          </div>
        </motion.div>
      </div>
      {selectedCard && (
        <CardModal
          card={selectedCard}
          segment={currentSegment}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default CardGame;
