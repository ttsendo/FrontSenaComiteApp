import React from "react";
import "../styles/ButtonStyles.css";

const Button = ({ text, type = "button", onClick }) => {
  return (
    <button className="custom-button" type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button; // ✅ Asegura que está exportado como default
