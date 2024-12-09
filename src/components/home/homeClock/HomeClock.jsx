import { useEffect, useState } from "react";
import { updateClock } from "../../../lib/todayTimes";


export const HomeClock = () => {
  const [time, setTime] = useState(updateClock());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(updateClock());
    }, 1000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="flex justify-center items-center pt-2">
      <div className=" rounded-lg w-fit px-6 text-center font-extrabold text-6xl md:text-8xl ">
        {time.hour}:{time.minutes}:{time.seconds}
        <sub className="text-3xl">{time.ampm}</sub>
      </div>
    </div>
  )
}
