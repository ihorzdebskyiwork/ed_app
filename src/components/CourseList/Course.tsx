import React from "react";
import { NavButton } from "../NavButton";

interface ICourse {
  tittle: string;
  description: string;
  isReady: boolean;
  isFree: boolean;
  id: number;
  questions: any;
  duration: number;
  sets: any;
  image: string;
}

export const Course: React.FC<ICourse> = ({
  tittle,
  description,
  isReady,
  isFree,
  id,
  duration,
  questions,
  sets,
  image,
}) => {
  return (
    <div className="flex justify-between shadow-xl h-60 p-5 rounded-xl max-w-lg gap-5">
      <div className="flex justify-end flex-col gap-3">
        <ul>
          <li>
            <p>{tittle}</p>
          </li>
          <li>
            <p>{`${description} sets of questions`}</p>
          </li>
          <li>
            <p>{`${questions} questions`}</p>
          </li>
          <li>
            <p>{`${duration} hour in simulator`}</p>
          </li>
          <li>
            <p>{isFree ? "Free" : "Need to pay"}</p>
          </li>
        </ul>

        <NavButton
          text={isReady ? "Start " : "Coming soon"}
          to={{ pathname: "/setsCourse", state: { sets } }}
          isDisabled={!isReady}
          extraStyles={`${
            isReady
              ? "hover:bg-blue-500 bg-blue-400 border-0"
              : "hover:bg-gray-400 bg-gray-300"
          } justify-center items-center border-2 h-10 w-32 p-1 rounded-xl font-semibold text-white duration-400 text-center`}
        />
      </div>

      <div className="flex items-center justify-center min-w-max min-h-max">
        <a href="/home">
          <img src={image} alt="Logo" width={"150px"} height={"150px"} />
        </a>
      </div>
    </div>
  );
};
