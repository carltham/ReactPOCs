import React, { useEffect } from "react";

export function Thought(props) {
  const { thought, removeThought } = props;

  useEffect(() => {
    setTimeout(() => {
      const timeRemaining = thought.expiresAt - Date.now();
      if (timeRemaining < 1) {
        handleRemoveClick();
      }
    }, 15000);
  }, []);

  const handleRemoveClick = () => {
    removeThought(thought.id);
  };

  return (
    <li className="Thought">
      <button
        aria-label="Remove thought"
        className="remove-button"
        onClick={handleRemoveClick}
      >
        &times;
      </button>
      <div className="text">{thought.text}</div>
    </li>
  );
}
