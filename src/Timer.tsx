import { useState, useEffect } from "react";
const MEDITATION_TIME = 600; // 10 minutes in seconds

export default function Timer({ finishMeditation, imageData }) {
  const [timeLeft, setTimeLeft] = useState(MEDITATION_TIME);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishMeditation();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finishMeditation]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      {(seconds > 30) && (
        <div className="info">
          <p>
            You are currently viewing "{imageData.title}" by{" "}
            {imageData.artistDisplayName}
          </p>
          <p>{minutes}:{seconds} remain</p>
        </div>
      )}
      {minutes == minutes / 2 && seconds == 0 && <p>You're half way there!</p>}
    </div>
  );
}
