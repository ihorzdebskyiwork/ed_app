import React, { useEffect, useState, useMemo } from "react";

// import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import {
//   stopSessionThunk,
//   checkAllTaskResultThunk,
// } from "../../redux/examSession/operations";

import { getTimeLeft } from "../../utils/getTimeLeft";

interface TimerProps {
  startedAt: string;
  duration: string;
}

export const Timer: React.FC<TimerProps> = ({ startedAt, duration }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  // const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  useEffect(() => {
    if (startedAt) {
      const intervalId = setInterval(() => {
        setTimeLeft(getTimeLeft(startedAt, duration));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startedAt, duration]);

  // useEffect(() => {
  //   if (timeLeft === "00:00:03") {
  //     dispatch(stopSessionThunk());
  //     dispatch(checkAllTaskResultThunk());
  //   }
  // }, [timeLeft, dispatch]);

  const timeLeftMemo = useMemo(() => timeLeft, [timeLeft]);

  return timeLeft ? (
    <span className="font-bold text-lg">Time left: {timeLeftMemo}</span>
  ) : null;
};
