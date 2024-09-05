import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { setActiveExamLoadTime } from "../../../redux/exams/examsReducer";
import {
  getSessionThunk,
  startSessionThunk,
} from "../../../redux/examSession/operations";
import {
  selectIsActiveSession,
  selectIsTerminal,
} from "../../../redux/examSession/selectors";
import { Spinner } from "../../../assets/spinner";

import clock from "../../../assets/svgexport-4.svg";
import dock from "../../../assets/svgexport-5.svg";
interface IProps {
  item: {
    ami: string;
    duration_min: number;
    number_of_questions: number;
    loading_time_sec: number;
  };

  index: number;
  examIsFree: boolean;
  activeExamId: string;

  allButtonDisabled: boolean;
  setAllButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SetsCourseItem: React.FC<IProps> = ({
  item,
  index,
  examIsFree,
  activeExamId,

  allButtonDisabled,
  setAllButtonDisabled,
}) => {
  const { duration_min, number_of_questions, loading_time_sec } = item;
  const [loadingState, setLoadingState] = useState<any>({});

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const history = useHistory();
  const isActiveSession = useSelector(selectIsActiveSession);
  const isTerminalPage = useSelector(selectIsTerminal);

  const handleStartSessionClick = async (
    activeExamId: string,
    index: number
  ) => {
    if (isActiveSession) {
      history.push("/examsTask");
    }
    if (!isActiveSession && isTerminalPage) {
      history.push("/examsTask");
    }

    if (!isActiveSession && !isTerminalPage) {
      setLoadingState({ [index]: true });
      setAllButtonDisabled(true);

      await dispatch(
        startSessionThunk({ exam_id: activeExamId, set_index: index })
      );
      await dispatch(getSessionThunk());

      setLoadingState({ [index]: false });
      setAllButtonDisabled(false);
      history.push("/examsTask");
    }
  };

  return (
    <li className="text-center shadow-xl p-5 rounded-xl">
      <h2 className="font-bold mb-2">Set {index + 1}</h2>
      <ul>
        <li>
          <div className="flex items-center mb-2">
            <img src={clock} width={"24px"} alt="logo56" className="mr-5" />
            <p>{duration_min} minutes</p>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <img src={dock} width={"24px"} alt="logo55" className="mr-5" />
            <p>{number_of_questions} questions</p>
          </div>
        </li>
      </ul>

      <button
        onClick={() => {
          handleStartSessionClick(activeExamId, index);
          dispatch(setActiveExamLoadTime(loading_time_sec));
        }}
        disabled={
          isActiveSession || !examIsFree || isTerminalPage || allButtonDisabled
        }
        className={`justify-center items-center border-2 h-10 w-32 mt-5 rounded-xl font-semibold duration-300 ${
          !examIsFree || isActiveSession
            ? "bg-gray-300 hover:bg-gray-400"
            : "bg-blue-400 hover:bg-blue-500"
        } text-white`}
      >
        {loadingState[index] ? (
          <>
            <Spinner /> Loading...
          </>
        ) : (
          "Start"
        )}
      </button>
    </li>
  );
};
