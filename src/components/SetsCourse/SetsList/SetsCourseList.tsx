import React, { useEffect, useState, useCallback } from "react";
import { SetsCourseItem } from "./SetsCourseItem";
import { PriceList } from "../SetsPrice/PriceList";
import { IOffers } from "../../../redux/offers/offersReducer";
export interface IActiveExam {
  description: string;
  id: string;
  in_implementation: boolean;
  isfree: boolean;
  sets: ISet[];
  tittle: string;
}

interface ISet {
  ami: string;
  duration_min: number;
  number_of_questions: number;
  loading_time_sec: number;
}

interface ISetsCourseList {
  activeExam: IActiveExam;
  allOffers: IOffers[];

  activeTitle: number;
}

export const SetsCourseList: React.FC<ISetsCourseList> = ({
  activeExam,
  allOffers,

  activeTitle,
}) => {
  const [allButtonDisabled, setAllButtonDisabled] = useState<boolean>(false);
  const [priceList, setPriceList] = useState<any>([]);
  const [examQuantity, setExamQuantity] = useState<number>();

  const findSetsCourseByIndex = useCallback(() => {
    const findOffers = allOffers.filter((offer) =>
      offer.exams.some((exam) => activeExam?.id === exam?.id)
    );

    setPriceList(findOffers);
    setExamQuantity(findOffers[0]?.exams[0]?.quantity);
  }, [allOffers, activeExam]);

  useEffect(() => {
    findSetsCourseByIndex();
  }, [activeExam, findSetsCourseByIndex]);

  return (
    <div>
      <div className="mx-auto mt-20 w-840px h-344px mb-5 flex justify-center">
        <div className="mx-auto w-840px pt-5 pl-5 pb-10 pr-5 shadow-md rounded-xl">
          <h2 className="font-bold mb-8">{activeExam?.tittle}</h2>

          <div>
            {activeExam && (
              <ul className="grid gap-x-6 gap-y-6 grid-cols-4">
                {activeExam?.sets.map((item: ISet, index: number) => (
                  <SetsCourseItem
                    examIsFree={activeExam?.isfree}
                    activeExamId={activeExam?.id}
                    index={index}
                    item={item}
                    key={index}
                    allButtonDisabled={allButtonDisabled}
                    setAllButtonDisabled={setAllButtonDisabled}
                  />
                ))}
              </ul>
            )}
            {!activeExam?.isfree && (
              <p className="font-semibold mt-6">Tries left: {examQuantity}</p>
            )}
          </div>
        </div>
      </div>

      <PriceList activeTitle={activeTitle} priceList={priceList} />
    </div>
  );
};
