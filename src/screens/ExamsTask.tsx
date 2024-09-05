import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import {
  getTerminalThunk,
  stopSessionThunk,
  getTaskData,
  checkAllTaskResultThunk,
} from "../redux/examSession/operations";
import { clearStateSessionExam } from "../redux/examSession/sessionReducer";
import {
  selectErrorTerminalRequest,
  selectIsLoadingTerminal,
  selectIsTerminal,
  selectScoreCheckResult,
  selectUserSession,
  selectSolutionsExam,
} from "../redux/examSession/selectors";
import { selectActiveExamLoadTime } from "../redux/exams/selectors";

import { ContentView } from "../components/ExamTask/ContentView/ContentView";
import { SideBarExamTask } from "../components/ExamTask/SideBarExamTask/SideBarExamTask";
import { Timer } from "../components/ExamTask/Timer";
import { Loader } from "../components/ExamTask/Loader";
import { Button } from "../components/Button";
import { SolutionModal } from "../components/ExamTask/SolutionModal";
import { Modal } from "../components/Modal";
import logo from "../assets/practicert_logo.png";

type ModalContentProps = {
  handleQuitSessionClick: () => void;
  onClose: () => void;
};

export const ExamsTask: React.FC = () => {
  const [score, setScore] = useState<string>("");
  const [taskSolutions, setSolutions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const history = useHistory();

  const userSession = useSelector(selectUserSession);
  const isTerminal = useSelector(selectIsTerminal);
  const isLoadingTerminal = useSelector(selectIsLoadingTerminal);
  const isErrorTerminal = useSelector(selectErrorTerminalRequest);

  const loadingSessionTime = useSelector(selectActiveExamLoadTime);
  // const isActiveSession = useSelector(selectIsActiveSession);
  // const isFetchData = useSelector(isFetchDescripAndSolution);

  const scoreResult = useSelector(selectScoreCheckResult);
  const solutionsExam = useSelector(selectSolutionsExam);

  //time left
  const duration = userSession.duration;
  const startedAt = userSession.started_at;

  useEffect(() => {
    if (!isTerminal) {
      dispatch(getTerminalThunk());
    } else {
      dispatch(getTaskData());
    }
  }, [dispatch, isTerminal]);

  // useEffect(() => {
  //   if (!isTerminal) {
  //     dispatch(getTerminalThunk());
  //   } else {
  //     if (!isFetchData) {
  //       dispatch(getTaskData());
  //     }
  //   }
  // }, [dispatch, isTerminal, isFetchData]);

  useEffect(() => {
    if (isErrorTerminal) {
      dispatch(stopSessionThunk());
      dispatch(clearStateSessionExam());
      history.push("/setsCourse");

      const message = "Something went wrong, please try again.";
      window.alert(message);
    }
  }, [isErrorTerminal, history, dispatch]);

  useEffect(() => {
    setScore(scoreResult);
    setSolutions(solutionsExam);
  }, [scoreResult, solutionsExam]);

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleQuitSessionClick = () => {
    dispatch(clearStateSessionExam());
    // if (isActiveSession) {
    dispatch(stopSessionThunk());
    // }

    closeConfirmModal();
    history.push("/setsCourse");
  };

  return (
    <>
      <div className="fixed top-0 flex justify-between px-10 shadow-md z-40 w-full bg-white">
        <div className="flex justify-start items-center">
          <NavLink to={"/home"}>
            <img src={logo} alt="Logo" className="mb-8px mr-24 h-56px" />
          </NavLink>

          <div className="flex gap-5 items-center justify-center">
            <Timer duration={duration} startedAt={startedAt} />
          </div>
        </div>
        <div className="flex  gap-5 justify-start items-center">
          <p className="text-red-600 font-semibold">{score ?? 0} %</p>
          <Button
            text="Get Score"
            handleClick={() => dispatch(checkAllTaskResultThunk())}
            extraStyles="mr-20px justify-center items-center border-2 h-10 w-32 text-center bg-blue-400 hover:bg-blue-500 text-white rounded-xl font-semibold duration-300"
          />
          <Button
            handleClick={() => {
              setShowConfirmModal(true);
            }}
            text="Quit"
            extraStyles="justify-center items-center border-2 border-blue-400 h-10 w-32 text-center text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl font-semibold duration-300"
          />
        </div>
      </div>
      {showModal && (
        <SolutionModal
          setShowModal={setShowModal}
          solutions={taskSolutions}
          selectedTaskIndex={selectedTaskIndex}
        />
      )}
      <div className="flex">
        {isLoadingTerminal && <Loader loadingTime={loadingSessionTime} />}
        <div className="h-screen flex flex-col w-2/5">
          <SideBarExamTask
            setShowModal={setShowModal}
            selectedTaskIndex={selectedTaskIndex}
            setSelectedTaskIndex={setSelectedTaskIndex}
          />
        </div>
        <div className="h-screen flex flex-col box-border w-3/5">
          <ContentView />
        </div>
      </div>

      {showConfirmModal &&
        ReactDOM.createPortal(
          <Modal onClose={closeConfirmModal} isOpen={showConfirmModal}>
            <ModalContent
              handleQuitSessionClick={handleQuitSessionClick}
              onClose={closeConfirmModal}
            />
          </Modal>,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

export const ModalContent: React.FC<ModalContentProps> = ({
  handleQuitSessionClick,
  onClose,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg p-8"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className={`flex ml-auto mr-[-20px] mt-[-20px] text-2xl cursor-pointer ${
          isHovered ? "scale-125" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClose}
      >
        &times;
      </button>
      <p className="mb-4 text-lg font-medium">
        Are you sure you want to end the current session?
      </p>
      <p className="mb-4 text-gray-600">All unsaved progress will be lost.</p>
      <div className="flex justify-end">
        <button
          className="mr-2 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold duration-300"
          onClick={handleQuitSessionClick}
        >
          End Session
        </button>

        <button
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 hover:border-gray-400 rounded-lg font-semibold duration-300"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
