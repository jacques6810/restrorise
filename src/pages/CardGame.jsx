import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import CardModal from "./CardModal";
import {
  truthQuestions,
  dareQuestions,
  siapaAkuQuestions,
  siapaAkuAnswers,
  hotsQuestions,
  gambarSegments,
} from "../gameData";
import "../App.css";

import { FaRegComment } from "react-icons/fa"; // For Truth
import { GiOpenBook } from "react-icons/gi"; // For Dare
import { FaUsers } from "react-icons/fa"; // For Siapa Aku
import { FaImage } from "react-icons/fa"; // For Gambar
import { FaFire } from "react-icons/fa"; // For Hots

// Import card images
import truthCardImg from "../assets/gambarKartu/truth.png";
import dareCardImg from "../assets/gambarKartu/dare.png";
import siapaAkuCardImg from "../assets/gambarKartu/siapa-aku.png";
import gambarCardImg from "../assets/gambarKartu/gambar.png";
import hotsCardImg from "../assets/gambarKartu/hots.png";

const segmentData = {
  truth: {
    title: "Truth",
    description:
      "Kartu Truth berisi pertanyaan seputar kesehatan reproduksi yang harus dijawab oleh siswa.",
    color: "#f87171",
    bgColor: "bg-[#f87171]",
    hoverColor: "hover:bg-[#ef4444]",
    textColor: "text-[#f87171]",
    icon: <FaRegComment className="text-6xl text-white opacity-80" />,
    cardImage: truthCardImg,
    cards: truthQuestions.map((q, i) => ({
      id: i + 1,
      content: "Truth " + (i + 1),
      details: q,
    })),
  },
  dare: {
    title: "Dare",
    description:
      "Kartu Dare berisi tantangan seputar kesehatan reproduksi yang harus dilakukan oleh siswa.",
    color: "#60a5fa",
    bgColor: "bg-[#60a5fa]",
    hoverColor: "hover:bg-[#3b82f6]",
    textColor: "text-[#60a5fa]",
    icon: <GiOpenBook className="text-6xl text-white opacity-80" />,
    cardImage: dareCardImg,
    cards: dareQuestions.map((q, i) => ({
      id: i + 1,
      content: "Dare " + (i + 1),
      details: q,
    })),
  },
  "siapa-aku": {
    title: "Siapa Aku?",
    description:
      "Kartu “Siapa Aku” berisi petunjuk tentang istilah atau bagian dalam kesehatan reproduksi yang harus ditebak oleh siswa.",
    color: "#34d399",
    bgColor: "bg-[#34d399]",
    hoverColor: "hover:bg-[#10b981]",
    textColor: "text-[#34d399]",
    icon: <FaUsers className="text-6xl text-white opacity-80" />,
    cardImage: siapaAkuCardImg,
    cards: siapaAkuQuestions.map((q, i) => ({
      id: i + 1,
      content: "Siapa Aku " + (i + 1),
      details: q,
      answer: siapaAkuAnswers[i],
    })),
  },
  gambar: {
    title: "Gambar",
    description:
      "Kartu Gambar berisi ilustrasi terkait kesehatan reproduksi yang harus ditebak dan dijelaskan oleh siswa.",
    color: "#fbbf24",
    bgColor: "bg-[#fbbf24]",
    hoverColor: "hover:bg-[#f59e0b]",
    textColor: "text-[#fbbf24]",
    icon: <FaImage className="text-6xl text-white opacity-80" />,
    cardImage: gambarCardImg,
    cards: gambarSegments.map((g, i) => ({
      id: i + 1,
      content: g.title,
      image: g.image,
    })),
  },
  hots: {
    title: "Hots",
    description:
      "Kartu HOTS berisi soal atau studi kasus tentang kesehatan reproduksi yang menuntut siswa menganalisis, mengevaluasi, dan memberikan solusi secara kritis.",
    color: "#a78bfa",
    bgColor: "bg-[#a78bfa]",
    hoverColor: "hover:bg-[#8b5cf6]",
    textColor: "text-[#a78bfa]",
    icon: <FaFire className="text-6xl text-white opacity-80" />,
    cardImage: hotsCardImg,
    cards: hotsQuestions.map((q, i) => ({
      id: i + 1,
      content: "Hots " + (i + 1),
      details: q,
    })),
  },
};

const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const CardGame = () => {
  const { segment } = useParams();
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState(Array(10).fill(false));
  const [shuffledCards, setShuffledCards] = useState([]);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(true);
  const [isBlockingEnabled, setIsBlockingEnabled] = useState(false);
  const [blockedCards, setBlockedCards] = useState(new Set());
  const currentSegment = segmentData[segment] || segmentData.truth;
  const [selectedCard, setSelectedCard] = useState(null);

  // Load blocked cards from localStorage on mount and segment change
  useEffect(() => {
    if (isBlockingEnabled) {
      const saved = localStorage.getItem(`blockedCards_${segment}`);
      if (saved) {
        setBlockedCards(new Set(JSON.parse(saved)));
      } else {
        setBlockedCards(new Set());
      }
    } else {
      setBlockedCards(new Set());
    }
    setFlippedCards(Array(currentSegment.cards.length).fill(false));
  }, [segment, isBlockingEnabled]);

  useEffect(() => {
    const initialCards = isShuffleEnabled
      ? shuffleCards(currentSegment.cards)
      : currentSegment.cards;
    setShuffledCards(initialCards);
  }, [isShuffleEnabled]);

  const handleCardClick = (index) => {
    // Check if card is blocked
    if (isBlockingEnabled && blockedCards.has(shuffledCards[index].id)) {
      return; // Don't allow clicking blocked cards
    }
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  const handleSeeYourCard = (card) => {
    if (isBlockingEnabled) {
      const newBlockedCards = new Set(blockedCards);
      newBlockedCards.add(card.id);
      setBlockedCards(newBlockedCards);
      // Save to localStorage
      localStorage.setItem(
        `blockedCards_${segment}`,
        JSON.stringify(Array.from(newBlockedCards)),
      );
    }
    setSelectedCard(card);
  };

  const handleToggleBlocking = () => {
    if (isBlockingEnabled) {
      // Turning OFF - clear blocked cards from localStorage
      localStorage.removeItem(`blockedCards_${segment}`);
      setBlockedCards(new Set());
    }
    setIsBlockingEnabled(!isBlockingEnabled);
  };

  const resetCards = () => {
    setFlippedCards(Array(currentSegment.cards.length).fill(false));
    const cardsToDisplay = isShuffleEnabled
      ? shuffleCards(currentSegment.cards)
      : currentSegment.cards;
    setShuffledCards(cardsToDisplay);
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
                className={`p-3 rounded-full ${currentSegment.bgColor} shadow-md`}
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
                <p className="text-sm max-w-sm sm:text-base text-gray-600 font-medium">
                  {currentSegment.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetCards}
                className={`px-4 py-2 ${currentSegment.bgColor} text-white rounded-xl font-bold shadow-lg ${currentSegment.hoverColor} transition flex items-center justify-center gap-2`}
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
                Reset Cards
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/spin")}
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
          {shuffledCards.map((card, index) => {
            const displayNumber = index + 1;
            const isBlocked = isBlockingEnabled && blockedCards.has(card.id);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleCardClick(index)}
                whileHover={{
                  scale: isBlocked ? 1 : flippedCards[index] ? 1.02 : 1.05,
                }}
                whileTap={{ scale: isBlocked ? 1 : 0.95 }}
                className={`relative aspect-[3/4] w-full max-w-[180px] md:max-w-[200px] lg:max-w-none lg:h-64 rounded-2xl shadow-xl overflow-hidden transition ${
                  isBlocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                } ${
                  isBlocked
                    ? "bg-gray-400"
                    : flippedCards[index]
                      ? "bg-white"
                      : "bg-white"
                }`}
              >
                <AnimatePresence>
                  {!flippedCards[index] ? (
                    <motion.div
                      key="front"
                      initial={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      {!isBlocked ? (
                        <img
                          src={currentSegment.cardImage}
                          alt={currentSegment.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-20 h-30 text-white opacity-80"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm-1 16.5h2v2h-2v-2zm0-12h2v10h-2V5.5z" />
                          </svg>
                          <span className="mt-2 text-white font-bold text-base">
                            Used
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 p-3 flex flex-col items-center justify-between"
                      style={{
                        border: `6px solid ${currentSegment.color}`,
                        borderRadius: "1rem",
                      }}
                    >
                      <div className="w-full flex justify-between items-start">
                        <span
                          className={`text-xs font-semibold`}
                          style={{ color: currentSegment.color }}
                        >
                          {currentSegment.title}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: currentSegment.color }}
                        >
                          #{displayNumber}
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
                        {segment !== "gambar" && (
                          <h3
                            className="text-lg md:text-xl font-bold mb-2"
                            style={{ color: currentSegment.color }}
                          >
                            {card.content}
                          </h3>
                        )}
                        {segment === "gambar" ? (
                          <img
                            src={card.image}
                            alt={card.content}
                            className="max-w-30 max-h-30 object-contain rounded-lg shadow-md"
                            style={{
                              border: `3px solid ${currentSegment.color}`,
                            }}
                          />
                        ) : (
                          <p
                            className="text-xs md:text-sm line-clamp-3"
                            style={{ color: currentSegment.color }}
                          >
                            {card.details}
                          </p>
                        )}
                      </div>

                      <div className="w-full flex justify-center">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSeeYourCard(card);
                          }}
                          className="text-xs px-4 py-1 rounded-full font-semibold cursor-pointer hover:shadow-md transition"
                          style={{
                            backgroundColor: currentSegment.color,
                            color: "white",
                          }}
                        >
                          See Your Card
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
                className="p-2 rounded-full bg-opacity-20"
                style={{ backgroundColor: `${currentSegment.color}33` }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={currentSegment.color}
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

            <div className="flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsShuffleEnabled(!isShuffleEnabled)}
                className="px-4 py-2 rounded-xl font-medium shadow-md transition flex items-center gap-2"
                style={{
                  backgroundColor: isShuffleEnabled
                    ? currentSegment.color
                    : "#e5e7eb",
                  color: isShuffleEnabled ? "white" : "#374151",
                }}
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
                Random {isShuffleEnabled ? "ON" : "OFF"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleBlocking}
                className="px-4 py-2 rounded-xl font-medium shadow-md transition flex items-center gap-2"
                style={{
                  backgroundColor: isBlockingEnabled
                    ? currentSegment.color
                    : "#e5e7eb",
                  color: isBlockingEnabled ? "white" : "#374151",
                }}
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Block {isBlockingEnabled ? "ON" : "OFF"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const allFlipped = flippedCards.every(Boolean);
                  setFlippedCards(
                    Array(shuffledCards.length).fill(!allFlipped),
                  );
                }}
                className="px-4 py-2 rounded-xl font-medium shadow-md transition flex items-center gap-2"
                style={{
                  backgroundColor: flippedCards.every(Boolean)
                    ? "#e5e7eb"
                    : currentSegment.color,
                  color: flippedCards.every(Boolean) ? "#374151" : "white",
                }}
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
                {flippedCards.every(Boolean)
                  ? "Flip All Back"
                  : "Flip All Cards"}
              </motion.button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full"
              style={{
                backgroundColor: currentSegment.color,
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
