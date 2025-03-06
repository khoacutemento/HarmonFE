import React from "react";

function Button({ isHovered, setIsHovered, text, onClick }) {
  return (
    <button
      style={{
        backgroundColor: "#9854DB",
        border: "none",
        color: "white",
        marginTop: "30px",
        padding: "15px 30px",
        borderRadius: "10px",
        cursor: "pointer",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s ease-in-out",
        fontSize: "18px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
