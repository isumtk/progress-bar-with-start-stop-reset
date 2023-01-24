import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const bar = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const [intervalID, setIntervalID] = useState<number | null>(null);

  const startRef = useRef<HTMLButtonElement>(null);
  const pauseRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const startLoading = () => {
    const id = setInterval(() => setProgress((prev) => prev + 0.5), 50);
    setIntervalID(id);
    setIsPaused(false);
    if (startRef.current) {
      startRef.current.disabled = true;
    }
    if (pauseRef.current) {
      pauseRef.current.disabled = false;
    }
    if (resetRef.current) {
      resetRef.current.disabled = false;
    }
  };

  const pauseResumeLoading = () => {
    if (intervalID !== null) {
      if (!isPaused) {
        clearInterval(intervalID);
        setIsPaused(true);
        if (pauseRef.current) {
          pauseRef.current.innerText = "resume";
        }
      } else {
        intervalRef.current = setInterval(() => {
          setProgress((prevProgress) => prevProgress + 0.5);
        }, 50);
        setIntervalID(intervalRef.current);
        setIsPaused(false);
        if (pauseRef.current) {
          pauseRef.current.innerText = "pause";
        }
      }
    }
  };

  const resetLoading = () => {
    if (intervalID !== null) {
      clearInterval(intervalID);
      setIntervalID(null);
      setIsPaused(true);
      setProgress(0);
      if (pauseRef.current) {
        pauseRef.current.innerText = "pause";
      }
      if (startRef.current) {
        startRef.current.disabled = false;
      }
      if (pauseRef.current) {
        pauseRef.current.disabled = true;
      }
      if (resetRef.current) {
        resetRef.current.disabled = true;
      }
    }
  };

  useEffect(() => {
    if (pauseRef.current) {
      pauseRef.current.disabled = true;
    }
    if (resetRef.current) {
      resetRef.current.disabled = true;
    }
  }, []);

  useEffect(() => {
    if (progress === 100) {
      resetLoading();
    }
  }, [progress]);

  return (
    <div className="app">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          ref={bar}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="buttons-container">
        <button ref={startRef} onClick={startLoading}>
          start
        </button>
        <button ref={pauseRef} onClick={pauseResumeLoading}>
          pause
        </button>
        <button ref={resetRef} onClick={resetLoading}>
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
