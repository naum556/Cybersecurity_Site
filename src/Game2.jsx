import { useState } from "react";

function Game2() {
  const messageBank = [
    { text: "Your game account has a new reward! Click here to claim it.", isPhishy: true },
    { text: "Hi! Your homework submission was successful. Great job!", isPhishy: false },
    { text: "You've won a free tablet! Give your password to claim it.", isPhishy: true },
    { text: "Your drawing was uploaded successfully to the classroom gallery.", isPhishy: false },
    { text: "Urgent! Your friend needs money immediately. Send it now!", isPhishy: true },
    { text: "New levels unlocked in FunKids Game! Enjoy playing!", isPhishy: false },
    { text: "Click this link to get unlimited coins in your game!", isPhishy: true },
    { text: "You received a message from your teacher. Check it in your inbox.", isPhishy: false },
    { text: "Your account is locked! Enter your password to unlock it.", isPhishy: true },
    { text: "Reminder: School picnic is on Friday. Don’t forget your lunch!", isPhishy: false }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [messageFeedback, setMessageFeedback] = useState("");

  function handleChoice(userChoice) {
    const currentMessage = messageBank[currentIndex];

    if (userChoice === currentMessage.isPhishy) {
      setMessageFeedback("✅ Correct!");
      setAttempts(0);

      setTimeout(() => {
        setMessageFeedback("");
        if (currentIndex + 1 < messageBank.length) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setMessageFeedback("🎉 You finished all messages!");
        }
      }, 1000);
    } else {
      setMessageFeedback("❌ Try again!");
      setAttempts(prev => prev + 1);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
        padding: "10px"
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <h2 style={{ margin: 0 }}>🕵️ Spot the Phishing</h2>

        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 22px)",
            lineHeight: "1.5",
            padding: "10px",
            background: "#f4f6f8",
            borderRadius: "10px"
          }}
        >
          {messageBank[currentIndex].text}
        </p>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => handleChoice(true)}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "#e74c3c",
              color: "white",
              transition: "0.2s",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            🚨 Phishy
          </button>

          <button
            onClick={() => handleChoice(false)}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "#2ecc71",
              color: "white",
              transition: "0.2s",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            ✅ Safe
          </button>
        </div>

        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            minHeight: "24px",
            color: messageFeedback.includes("Correct")
              ? "green"
              : messageFeedback.includes("Try")
              ? "red"
              : "#333"
          }}
        >
          {messageFeedback}
        </p>

        <p style={{ fontSize: "14px", color: "#666" }}>
          Attempts: {attempts}
        </p>
      </div>
    </div>
  );
}

export default Game2;