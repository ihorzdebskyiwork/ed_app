import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { getExams } from "../redux/exams/operations";
import { getOffers } from "../redux/offers/operations";
import { selectAllExams, selectIsExamsFetched } from "../redux/exams/selectors";
import { selectIsActiveSession } from "../redux/examSession/selectors";
import {
  selectAllOffers,
  selectIsOffersFetched,
} from "../redux/offers/selectors";

import { Header } from "../components/Header";
import { SetsCourseList } from "../components/SetsCourse/SetsList/SetsCourseList";
import { SideBar } from "../components/SetsCourse/SideBarSetsCourse/SideBar";
import { InfoActiveSession } from "../components/ExamTask/InfoActiveSession";

export const SetsCoursePage: React.FC = () => {
  const [activeTitle, setActiveTitle] = useState<number>(0);

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const allExams = useSelector(selectAllExams);
  const allOffers = useSelector(selectAllOffers);
  const isFetchedExams = useSelector(selectIsExamsFetched);
  const isFetchedOffers = useSelector(selectIsOffersFetched);
  const isActiveSession = useSelector(selectIsActiveSession);

  useEffect(() => {
    if (isFetchedExams || isFetchedOffers) {
      return;
    }
    dispatch(getExams());
    dispatch(getOffers());
  }, [dispatch, isFetchedOffers, isFetchedExams]);

  return (
    <>
      <div>
        <Header />
        <div className="box-border flex flex-row">
          {isActiveSession && <InfoActiveSession />}

          <div className="h-screen flex flex-col w-1/4">
            <SideBar
              setActiveTitle={setActiveTitle}
              activeTitle={activeTitle}
              exams={allExams}
            />
          </div>
          <div className="box-border w-3/4 p-3">
            <SetsCourseList
              activeExam={allExams[activeTitle]}
              activeTitle={activeTitle}
              allOffers={allOffers}
            />
          </div>
        </div>
      </div>
    </>
  );
};
