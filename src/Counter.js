import React, { useState } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    setCount(count => count + 1);
  }

  const decrement = () => {
    setCount(count => count - 1);
  };

  return { count, increment, decrement };
}

export const Counter = () => {
  const { count, increment, decrement } = useCounter(0);  

  return (
    <>
      <div
        className="t-counter"
        data-testid="counter"
      >
        {count}
      </div>

      <button
        className="t-btn-increment"
        data-testid="btn-increment"
        onClick={increment}
      >
        Increment
      </button>

      <button
        className="t-btn-decrement"
        data-testid="btn-decrement"
        onClick={decrement}
      >
        Decrement
      </button>
    </>
  );
};
