import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const knightPath = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 0 },
  { x: 0, y: 1 },
  { x: 2, y: 2 },
  { x: 1, y: 0 },
];

const gridSize = 42;

const ChessLoader = ({ minDuration = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let animationInterval;
    let hideTimer;

    const startAnimation = () => {
      let index = 0;
      animationInterval = setInterval(() => {
        setCurrentIndex(index % knightPath.length);
        index++;
      }, 800); // Faster animation for better UX
    };

    // Start animation immediately
    startAnimation();

    // Hide loader after minimum duration
    hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, minDuration);

    return () => {
      if (animationInterval) clearInterval(animationInterval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [minDuration]);

  if (!isVisible) return null;

  const currentPos = knightPath[currentIndex];
  const isGoldSquare = (currentPos.x + currentPos.y) % 2 === 0;
  const knightColor = isGoldSquare ? "black" : "#FFD700";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 40px)",
          gridTemplateRows: "repeat(3, 40px)",
          gap: "2px",
          background: "#000",
          position: "relative",
          padding: "0px",
          borderRadius: "8px",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
        }}
      >
        {[...Array(9)].map((_, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const isGold = (row + col) % 2 === 0;
          return (
            <Box
              key={index}
              sx={{
                width: "40px",
                height: "40px",
                background: isGold ? "#FFD700" : "#000",
                border: "1px solid #FFD700",
              }}
            />
          );
        })}

        {/* Knight Animation */}
        <motion.div
          animate={{
            x: currentPos.x * gridSize,
            y: currentPos.y * gridSize,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "36px",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            filter: `drop-shadow(0 0 3px ${knightColor})`,
          }}
        >
          <span
            style={{
              fontSize: "34px",
              color: knightColor,
              textShadow: `0 0 5px ${knightColor}`,
              fontWeight: "bold",
            }}
          >
            ♘
          </span>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ChessLoader;
