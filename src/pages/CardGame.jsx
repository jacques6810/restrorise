import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

import { FaRegComment } from "react-icons/fa"; // For Truth
import { FaRegGrinTongueWink } from "react-icons/fa"; // For Dare
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
    icon: <FaRegGrinTongueWink className="text-6xl text-white opacity-80" />,
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
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <h1 className={`text-3xl font-bold ${currentSegment.textColor}`}>
            {currentSegment.title} Cards
          </h1>
          <div className="flex gap-3">
            <button
              onClick={resetCards}
              className={`px-4 py-2 ${currentSegment.color} text-white rounded-lg font-medium shadow-md ${currentSegment.hoverColor} transition`}
            >
              Shuffle Cards
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Back to Wheel
            </button>
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
                flippedCards[index] ? "bg-white" : currentSegment.color
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
                    <div className="absolute inset-0 bg-white/10 rounded-xl border-2 border-white/20"></div>
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
                    className="absolute inset-0 p-5 flex flex-col items-center justify-between bg-white"
                  >
                    <div className="w-full flex justify-between items-start">
                      <span
                        className={`text-sm font-semibold ${currentSegment.textColor}`}
                      >
                        {currentSegment.title}
                      </span>
                      <span className="text-xs text-gray-500">#{card.id}</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {card.content}
                      </h3>
                      <p className="text-sm text-gray-600">{card.details}</p>
                    </div>

                    <div className="w-full flex justify-center">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${currentSegment.color} text-white`}
                      >
                        Challenge Card
                      </span>
                    </div>

                    <div
                      className={`absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 ${currentSegment.color.replace(
                        "bg",
                        "border"
                      )} rounded-tl-lg`}
                    ></div>
                    <div
                      className={`absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 ${currentSegment.color.replace(
                        "bg",
                        "border"
                      )} rounded-tr-lg`}
                    ></div>
                    <div
                      className={`absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 ${currentSegment.color.replace(
                        "bg",
                        "border"
                      )} rounded-bl-lg`}
                    ></div>
                    <div
                      className={`absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 ${currentSegment.color.replace(
                        "bg",
                        "border"
                      )} rounded-br-lg`}
                    ></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-white rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-600">Cards flipped: </span>
              <span className="font-semibold">
                {flippedCards.filter(Boolean).length} / {shuffledCards.length}
              </span>
            </div>
            <button
              onClick={() => {
                const allFlipped = flippedCards.every(Boolean);
                setFlippedCards(Array(10).fill(!allFlipped));
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            >
              {flippedCards.every(Boolean) ? "Flip All Back" : "Flip All Cards"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardGame;
