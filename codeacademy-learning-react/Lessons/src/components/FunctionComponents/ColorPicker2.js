import React, { useState } from "react";

const colorNames = [
  "Aquamarine",
  "BlueViolet",
  "Chartreuse",
  "CornflowerBlue",
  "Thistle",
  "SpringGreen",
  "SaddleBrown",
  "PapayaWhip",
  "MistyRose",
];

export default function ColorPicker() {
  const [color, setColor] = useState("Tomato");

  let backgroundColor = color === undefined ? "tttt" : color;
  const divStyle = { backgroundColor: backgroundColor };

  return (
    <div style={divStyle}>
      <p>Selected color: {color}</p>
      {colorNames.map((colorName) => (
        <button onClick={() => setColor(colorName)} key={colorName}>
          {colorName}
        </button>
      ))}
      <button onClick={() => setColor(undefined)}>Reset</button>
    </div>
  );
}
