import { useState, useEffect, useRef } from "react";

function Game5() {
  const [round, setRound] = useState(1);
  const [nodes, setNodes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 500, height: 500 });

  const nodeSize = 60;
  const maxRounds = 6;

  
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 🔁 Generate nodes
  useEffect(() => {
    generateNodes(round + 2);
  }, [round, size]);

  function generateNodes(count) {
    let newNodes = [];

    for (let i = 0; i < count; i++) {
      newNodes.push({
        id: i,
        value: i === 0 ? "Start" : i + 1,
        x: Math.random() * (size.width - nodeSize - 20) + 10,
        y: Math.random() * (size.height - nodeSize - 20) + 10,
      });
    }

    setNodes(newNodes);
    setCurrent(0);
    setLines([]);
  }

  function handleNodeClick(index) {
    if (index !== current) return;

    if (index > 0) {
      const prev = nodes[index - 1];
      const curr = nodes[index];

      setLines((prevLines) => [
        ...prevLines,
        {
          x1: prev.x + nodeSize / 2,
          y1: prev.y + nodeSize / 2,
          x2: curr.x + nodeSize / 2,
          y2: curr.y + nodeSize / 2,
        },
      ]);
    }

    setCurrent(index + 1);

    if (index === nodes.length - 1) {
      setTimeout(() => {
        if (round < maxRounds) {
          setRound((r) => r + 1);
        } else {
          alert("🎉 You finished all rounds!");
        }
      }, 500);
    }
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
      <div style={{ textAlign: "center", color: "white" }}>
        <h2 style={{ marginBottom: "10px" }}>🧠 Connect the Path</h2>

        <p style={{ marginBottom: "15px", opacity: 0.8 }}>
          Click nodes in order: 1 → 2 → 3...
        </p>

        {/* 🎮 GAME AREA */}
        <div
          ref={containerRef}
          style={{
            width: "90vw",
            maxWidth: "500px",
            height: "500px",
            position: "relative",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            overflow: "hidden",
            margin: "auto",
          }}
        >
          {/* SVG lines */}
          <svg
            width={size.width}
            height={size.height}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {lines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="cyan"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isActive = i === current;
            const isDone = i < current;

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(i)}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  width: nodeSize,
                  height: nodeSize,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  transition: "0.2s ease",

                  background: isDone
                    ? "#2ecc71"
                    : isActive
                    ? "#ff9800"
                    : "#555",

                  color: "white",

                  boxShadow: isActive
                    ? "0 0 15px #ff9800"
                    : "0 4px 10px rgba(0,0,0,0.3)",

                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
              >
                {node.value}
              </div>
            );
          })}

          {/* Round UI */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "rgba(0,0,0,0.4)",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: "14px",
            }}
          >
            Round {round} / {maxRounds}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game5;