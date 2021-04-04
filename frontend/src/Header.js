import React from "react";
import { jumboStyle, GREEN, BLACK } from "./Constants";

export default function Header() {
  return (
    <div className="jumbotron" style={jumboStyle}>
      <h1
        style={{
          fontSize: "7.5em",
          color: GREEN,
          backgroundColor: BLACK,
          position: "absolute",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          border: "0.5px solid white",
          borderRadius: "10px",
          padding: "10px",
          zIndex: 5,
        }}
      >
        <b>ensemble</b>
      </h1>
    </div>
  );
}
