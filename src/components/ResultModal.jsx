import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import ReactDoms from "react-dom";

export default function ResultModal({
  ref,
  targetTime,
  remainingTime,
  onReset,
}) {
  // useImperativeHandle allows the parent component to call the dialog methods
  // like showModal and close on the dialog element
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return ReactDoms.createPortal (
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2> You Lost </h2>}
      {!userLost && <h2>Your score is {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog">
        <button onSubmit={onReset}>Close</button>
      </form>
    </dialog>
    , document.getElementById("modal")
  );
}
