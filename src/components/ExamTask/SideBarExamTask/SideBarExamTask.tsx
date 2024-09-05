import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { setTaskData } from "../../../redux/examSession/sessionReducer";
import { checkOneTaskResultThunk } from "../../../redux/examSession/operations";
import {
  selectOneTaskResultRequest,
  selectDecsriptionsExam,
  selectCheckAllResult,
  selectIsLoading,
  selectTaskData,
} from "../../../redux/examSession/selectors";

import { Button } from "../../Button";
import { Spinner } from "./../../../assets/spinner";

interface IProps {
  setShowModal: any;
  selectedTaskIndex: number;
  setSelectedTaskIndex: any;
}

export const SideBarExamTask: React.FC<IProps> = ({
  setShowModal,
  selectedTaskIndex,
  setSelectedTaskIndex,
}) => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const resultOneTask = useSelector(selectOneTaskResultRequest);
  const decsriptionsExam = useSelector(selectDecsriptionsExam);
  const checkAllResult = useSelector(selectCheckAllResult);
  const isFetchCheckTask = useSelector(selectIsLoading);
  const taskNumbers = useSelector(selectTaskData);

  useEffect(() => {
    const taskDecsriptionsLength = decsriptionsExam?.length;

    if (
      taskNumbers?.result?.length > 0 ||
      taskNumbers?.taskNumberColor?.length > 0
    ) {
      return;
    }

    if (taskDecsriptionsLength && taskDecsriptionsLength > 0) {
      const colorTaskArray = new Array(taskDecsriptionsLength).fill("black");
      const resultTaskArray = new Array(taskDecsriptionsLength).fill(undefined);

      const data = { result: resultTaskArray, taskNumberColor: colorTaskArray };
      dispatch(setTaskData(data));
    }
  }, [
    decsriptionsExam,
    dispatch,
    taskNumbers?.result?.length,
    taskNumbers?.taskNumberColor?.length,
  ]);

  useEffect(() => {
    if (checkAllResult?.results?.length > 0) {
      // const changeAllTaskNumberColor = () => {
      const results = checkAllResult?.results?.map((arr: any) => {
        return arr.every((obj: any) => obj.correct === true);
      });

      const data = {
        result: checkAllResult?.results,
        taskNumberColor: results,
      };
      dispatch(setTaskData(data));
      // };
      // changeAllTaskNumberColor();
    }
  }, [checkAllResult, dispatch]);

  useEffect(() => {
    if (resultOneTask?.length > 0) {
      // const changeTaskResultAndColor = () => {
      const result = resultOneTask?.every((arr: any) => {
        return arr.correct === true;
      });

      const updatedTaskNumberColor = taskNumbers?.taskNumberColor
        ? [...taskNumbers.taskNumberColor]
        : [];

      const updatedResultTask = taskNumbers?.result
        ? [...taskNumbers.result]
        : [];

      updatedTaskNumberColor[selectedTaskIndex] = result;
      updatedResultTask[selectedTaskIndex] = resultOneTask;

      const data = {
        result: updatedResultTask,
        taskNumberColor: updatedTaskNumberColor,
      };

      dispatch(setTaskData(data));
      // };
      // changeTaskResultAndColor();
    }
  }, [resultOneTask, dispatch]);

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
  };

  return (
    <div className="flex-1 mt-80px mb-20px ml-20px p-5 pt-5 shadow-md rounded-xl items-center">
      <div className="w-full p-3 shadow-md rounded-xl min-h-[90%]">
        <div className="">
          <ul className="flex h-10 justify-center items-center">
            {decsriptionsExam &&
              taskNumbers?.taskNumberColor?.length > 0 &&
              taskNumbers?.taskNumberColor?.map((item: any, index: number) => {
                const isLast =
                  index === taskNumbers?.taskNumberColor?.length - 1;

                let circleColor = "";

                if (item === true) {
                  circleColor = "text-green-600 border-green-600";
                } else if (item === false) {
                  circleColor = "text-red-700 border-red-700";
                } else {
                  circleColor = "text-black border-black";
                }

                return (
                  <li key={index}>
                    <button
                      className={`inline-flex items-center justify-center h-7 w-7 rounded-full border-2 ${circleColor} ${
                        isLast ? "" : " mr-2"
                      }`}
                      onClick={() => handleTaskClick(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              })}
          </ul>

          <div className="mb-12px h-296px">
            <p className="mb-12px font-semibold">Description:</p>
            {decsriptionsExam && selectedTaskIndex !== null && (
              <div className="h-248px overflow-y-auto">
                <div className="bg-gray-100">
                  <span className="font-semibold mr-2">
                    {selectedTaskIndex + 1}.
                  </span>
                  <span
                    className="text-lg font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: decsriptionsExam?.[selectedTaskIndex]?.context,
                    }}
                  ></span>
                  {/* <span className="text-lg font-semibold">
                    {decsriptionsExam?.[selectedTaskIndex]?.context}
                  </span> */}
                </div>
                {/* <p>{decsriptionsExam?.[selectedTaskIndex]?.description}</p> */}

                <p
                  dangerouslySetInnerHTML={{
                    __html: decsriptionsExam?.[selectedTaskIndex]?.description,
                  }}
                ></p>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="flex font-semibold mb-12px">Result:</p>
          <ul className="overflow-y-auto max-h-152px mb-12px">
            {taskNumbers?.result?.length > 0 && (
              <>
                {taskNumbers?.result[selectedTaskIndex]?.map(
                  (item: any, index: number) => (
                    <li key={index} className="mb-12px list-disc">
                      <div className="flex">
                        <span className="font-semibold mr-8px">
                          {index + 1}.
                        </span>
                        <p className="ml-1px mr-8px">
                          {item.point_description}
                        </p>

                        {item.correct ? (
                          <span className="flex items-center justify-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-700">
                            <svg
                              className="h-5 w-5 text-green-700"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 3L19 5"
                              />
                            </svg>
                            <span className="ml-1">Success</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                            <svg
                              className="heroicon-s-x-circle h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z"
                              />
                            </svg>
                            <span className="ml-1">Error</span>
                          </span>
                        )}
                      </div>
                    </li>
                  )
                )}
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="flex justify-between mt-24px">
        <Button
          handleClick={() => setShowModal(true)}
          extraStyles="flex items-center justify-end ml-auto mr-10px justify-center items-center border-2 h-10 w-32 text-center bg-blue-400 hover:bg-blue-500 text-white rounded-xl font-semibold duration-300"
          text="Solution"
        />

        <button
          onClick={() => {
            dispatch(checkOneTaskResultThunk(selectedTaskIndex));
          }}
          className="flex items-center justify-end ml-auto mr-10px justify-center items-center border-2 h-10 w-32 text-center bg-blue-400 hover:bg-blue-500 text-white rounded-xl font-semibold duration-300"
        >
          {isFetchCheckTask ? (
            <>
              <Spinner /> Loading...
            </>
          ) : (
            "Check task"
          )}
        </button>
      </div>
    </div>
  );
};
