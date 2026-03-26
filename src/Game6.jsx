import { useState, useEffect } from "react";

function Game6() {

  const [level, setLevel] = useState(1);
  const [availableDigits, setAvailableDigits] = useState([]);
  const [password, setPassword] = useState("");
  const [guess, setGuess] = useState("");
  const [hintIndexes, setHintIndexes] = useState([]);
  const [message, setMessage] = useState("");

  const maxLevel = 7;

  useEffect(() => {
    const digits = [];
    const limit = Math.min(4 + level - 1, 10);

    for (let i = 0; i < limit; i++) {
      digits.push(i);
    }

    setAvailableDigits(digits);

    let pool = [...digits];
    let newPass = "";

    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * pool.length);
      newPass += pool[index];
      pool.splice(index, 1);
    }

    setPassword(newPass);

    let hints = [];
    while (hints.length < 2) {
      let rand = Math.floor(Math.random() * 3);
      if (!hints.includes(rand)) hints.push(rand);
    }

    setHintIndexes(hints);

    setGuess("");
    setMessage("");

  }, [level]);

  function pressDigit(d) {
    if (guess.length >= 3) return;
    setGuess(prev => prev + d);
  }

  function clearGuess() {
    setGuess("");
  }

  function submitGuess() {

    if (guess.length !== 3) return;

    if (guess === password) {
      setMessage("ACCESS GRANTED");

      setTimeout(() => {
        if (level < maxLevel) {
          setLevel(l => l + 1);
        } else {
          setMessage("ALL SYSTEMS UNLOCKED");
        }
      }, 800);

    } else {
      let correct = 0;
      for (let i = 0; i < 3; i++) {
        if (guess[i] === password[i]) correct++;
      }

      setMessage(`${correct} DIGIT(S) CORRECT`);
      setGuess("");
    }
  }

  const hintDisplay = password
    .split("")
    .map((d, i) => (hintIndexes.includes(i) ? d : "_"))
    .join(" ");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #0f2027, #000000)",
        padding: "10px",
        color: "#00ff9f",
        fontFamily: "monospace"
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "420px",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid #00ff9f",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,255,159,0.3)"
        }}
      >

        <h2>🔐 PASSWORD TERMINAL</h2>
        <h3>LEVEL {level}</h3>

        <div style={{ marginBottom: "15px", opacity: 0.8 }}>
          HINT: {hintDisplay}
        </div>

        <div
          style={{
            border: "1px solid #00ff9f",
            padding: "15px",
            fontSize: "28px",
            letterSpacing: "10px",
            marginBottom: "20px",
            background: "rgba(0,0,0,0.4)",
            borderRadius: "8px"
          }}
        >
          {guess.padEnd(3, "_")}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px"
          }}
        >
          {availableDigits.map(d => (
            <button
              key={d}
              onClick={() => pressDigit(d)}
              style={{
                padding: "15px",
                fontSize: "18px",
                background: "#111",
                color: "#00ff9f",
                border: "1px solid #00ff9f",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            onClick={submitGuess}
            style={{
              padding: "10px 15px",
              background: "#00ff9f",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ENTER
          </button>

          <button
            onClick={clearGuess}
            style={{
              padding: "10px 15px",
              background: "#ff3b3b",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              color: "white"
            }}
          >
            CLEAR
          </button>
        </div>

        <h3
          style={{
            marginTop: "15px",
            minHeight: "24px",
            color:
              message.includes("GRANTED") || message.includes("UNLOCKED")
                ? "#00ff9f"
                : "#ff3b3b"
          }}
        >
          {message}
        </h3>

      </div>
    </div>
  );
}

export default Game6;