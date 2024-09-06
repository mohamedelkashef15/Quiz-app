import { useEffect } from "react";
import { ITimer } from "./interfaces";

function Timer({ secondRemaining, dispatch }: ITimer) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  if (secondRemaining === null) return null;
  const min = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;

  return (
    <div className="timer">
      {min < 10 ? "0" : ""}
      {min}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
}

export default Timer;
