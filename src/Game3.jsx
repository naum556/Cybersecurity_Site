import { useState, useEffect } from "react";
import pc from "./assets/pc.png";
import virus from "./assets/virus.png";
import antivirus from "./assets/antivirus.png"

function ClickSafeIcons() {
  const [icons, setIcons] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const iconTypes = [
    { type: "safe", img: pc },
    { type: "safe", img: antivirus },
    { type: "virus", img: virus }
  ];

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const randomType = iconTypes[Math.floor(Math.random() * iconTypes.length)];

      const newIcon = {
        id: Date.now() + Math.random(),
        type: randomType.type,
        img: randomType.img,
        x: Math.random() * 85 + "%",
        y: Math.random() * 85 + "%"
      };

      setIcons((prev) => [...prev, newIcon]);

      setTimeout(() => {
        setIcons((prev) => prev.filter((icon) => icon.id !== newIcon.id));
      }, 2500);
    }, 900);

    return () => clearInterval(interval);
  }, [gameOver]);

  function handleClick(icon) {
    if (icon.type === "virus") {
      setGameOver(true);

      setTimeout(() => {
        alert("💀 Game Over! Restarting...");
        setScore(0);
        setIcons([]);
        setGameOver(false);
      }, 200);

    } else {
      setScore((prev) => prev + 1);
      setIcons((prev) => prev.filter((i) => i.id !== icon.id));
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #43cea2, #185a9d)",
        padding: "10px"
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          background: "white",
          borderRadius: "20px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          🖱️ Click Safe Icons
        </h2>

        <p style={{ margin: "5px 0", color: "#555" }}>
          Avoid viruses!
        </p>

        <h3 style={{ marginBottom: "15px" }}>
          Score: {score}
        </h3>

        <div
          style={{
            width: "100%",
            aspectRatio: "3 / 2",
            border: "3px solid #333",
            borderRadius: "15px",
            position: "relative",
            background: "#e0f7fa",
            overflow: "hidden"
          }}
        >
          {icons.map((icon) => (
            <img
              key={icon.id}
              src={icon.img}
              alt={icon.type}
              onClick={() => handleClick(icon)}
              style={{
                position: "absolute",
                left: icon.x,
                top: icon.y,
                width: "clamp(30px, 6vw, 50px)",
                height: "clamp(30px, 6vw, 50px)",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClickSafeIcons;