import React from "react";
import { useHistory } from "react-router-dom";

interface IInfoActiveSession {}

export const InfoActiveSession: React.FC<IInfoActiveSession> = () => {
  const history = useHistory();

  return (
    <div className="absolute bg-green-500 w-full h-6 mt-64px flex items-center justify-center">
      <p className="text-white">
        You have an active exam session.
        <button
          className="mr-1 ml-1 hover:underline"
          onClick={() => history.push("/examsTask")}
        >
          "Click here"
        </button>
        to finish the exam.
      </p>
    </div>
  );
};
