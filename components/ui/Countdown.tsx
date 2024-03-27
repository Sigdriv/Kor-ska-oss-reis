"use client";
import { useState, useEffect } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-03-28T17:00:00") - +new Date();
    let timeLeft: {
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="mt-2">
      <div className=" text-2xl text-center">
        <h1>{timeLeft["days"]} dager</h1>
        <h1>{timeLeft["hours"]} timer</h1>
        <h1>{timeLeft["minutes"]} minutt</h1>
        <h1>{timeLeft["seconds"]} sekunder</h1>
      </div>
    </div>
  );
};

export default Countdown;
