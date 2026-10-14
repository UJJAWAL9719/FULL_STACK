
import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const startTime = useRef(null);
  const elapsed = useRef(0);

  useEffect(() => {
    if (!running) return;

    startTime.current = Date.now();

    const interval = setInterval(() => {
      const total =
        elapsed.current +
        (Date.now() - startTime.current);

      setSeconds(Math.floor(total / 1000));
    }, 100);

    return () => clearInterval(interval);
  }, [running]);

  const pause = () => {
    if (running) {
      elapsed.current += Date.now() - startTime.current;
      setRunning(false);
    }
  };

  const reset = () => {
    setRunning(false);
    elapsed.current = 0;
    startTime.current = null;
    setSeconds(0);
  };

  return (
    <div>
      <h2>Stopwatch: {seconds} seconds</h2>

      <button
        onClick={() => setRunning(true)}
        disabled={running}
      >
        Start
      </button>

      <button onClick={pause} disabled={!running}>
        Pause
      </button>

      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
