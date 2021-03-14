import React, { useState } from "react";
import { generateId, getNewExpirationTime } from "./utilities";

export function AddThoughtForm({ addThought }) {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setText(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text && text.length > 0) {
      let newThought = {
        id: generateId(),
        text: text,
        expiresAt: getNewExpirationTime(),
      };
      setText("");
      addThought(newThought);
    }
  };

  return (
    <form className="AddThoughtForm" onSubmit={handleSubmit}>
      <input
        type="text"
        id="thoughtField"
        aria-label="What's on your mind?"
        placeholder="What's on your mind?"
        value={text}
        onChange={handleTextChange}
      />
      <input type="submit" value="Add" />
    </form>
  );
}
