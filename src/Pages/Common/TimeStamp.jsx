// src/components/Timer.js
import { useEffect, useState } from "react";

const Timer = ({ duration, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onExpire();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onExpire]);

  return (
    <div className="text-orange-400 font-mb-4">
      Time left: {timeLeft}s
    </div>
  );
};

export default Timer;
