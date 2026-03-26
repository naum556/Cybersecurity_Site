import { useState, useEffect } from "react";
import pc from "./assets/pc.png";
import virus from "./assets/virus.png";

function Game4() {
  const gameWidth = 500;
  const gameHeight = 400;
  const playerWidth = 50;

  const [playerX, setPlayerX] = useState(250);
  const [viruses, setViruses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  function handleMouseMove(e) {
    if (gameOver) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left - playerWidth / 2;

    if (x < 0) x = 0;
    if (x > gameWidth - playerWidth) x = gameWidth - playerWidth;

    setPlayerX(x);
  }

  // Spawn viruses
  useEffect(() => {
    if (gameOver) return;

    const spawn = setInterval(() => {
      const newVirus = {
        id: Date.now() + Math.random(),
        x: Math.random() * (gameWidth - 40),
        y: 0,
      };

      setViruses((prev) => [...prev, newVirus]);
    }, 900);

    return () => clearInterval(spawn);
  }, [gameOver]);

  // Move viruses
  useEffect(() => {
    if (gameOver) return;

    const fall = setInterval(() => {
      setViruses((prev) =>
        prev
          .map((v) => ({ ...v, y: v.y + 5 }))
          .filter((v) => v.y < gameHeight)
      );
    }, 40);

    return () => clearInterval(fall);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    viruses.forEach((v) => {
      const playerY = gameHeight - 40;

      if (
        v.y + 30 > playerY &&
        v.x < playerX + playerWidth &&
        v.x + 30 > playerX
      ) {
        setGameOver(true);
      }
    });
  }, [viruses, playerX]);

  function retryGame() {
    setViruses([]);
    setPlayerX(250);
    setGameOver(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: "10px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>🛡️ Avoid the Viruses</h2>

        <div
          onMouseMove={handleMouseMove}
          style={{
            width: "90vw",
            maxWidth: gameWidth,
            height: gameHeight,
            margin: "auto",
            position: "relative",
            overflow: "hidden",
            background: "rgba(0,0,0,0.7)",
            borderRadius: "16px",
            border: "2px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          {/* Player */}
          <img
            src={pc}
            alt="player"
            style={{
              position: "absolute",
              bottom: 5,
              left: playerX,
              width: playerWidth,
              height: playerWidth,
              transition: "left 0.05s linear",
              filter: "drop-shadow(0 5px 5px rgba(0,0,0,0.5))",
            }}
          />

          {/* Viruses */}
          {viruses.map((v) => (
            <img
              key={v.id}
              src={virus}
              alt="virus"
              style={{
                position: "absolute",
                top: v.y,
                left: v.x,
                width: 30,
                height: 30,
                transition: "top 0.05s linear",
                filter: "drop-shadow(0 5px 5px rgba(0,0,0,0.5))",
              }}
            />
          ))}

          {/* Game Over */}
          {gameOver && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <h1 style={{ margin: 0 }}>💀 Game Over</h1>

              <button
                onClick={retryGame}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: "#00c6ff",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game4;