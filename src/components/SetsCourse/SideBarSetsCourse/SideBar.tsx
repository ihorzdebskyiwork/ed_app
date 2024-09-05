import React from "react";
import { IExam } from "../../../redux/exams/examsReducer";

interface IProps {
  setActiveTitle: React.Dispatch<React.SetStateAction<number>>;
  activeTitle: number;
  exams: IExam[];
}

export const SideBar: React.FC<IProps> = ({
  setActiveTitle,
  activeTitle,
  exams,
}) => {
  return (
    <div className="mt-96px ml-5 mb-4 h-full">
      <ul className="shadow-md p-5 h-full rounded-xl">
        {exams &&
          exams?.map((item: any, index: number) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTitle(index)}
                disabled={item.in_implementation}
                className={`${
                  item.in_implementation ? "text-slate-400" : "text-slate-900 "
                } ${index !== exams.length - 1 ? "mb-2" : ""} ${
                  index === activeTitle ? "border-b-[3px]" : ""
                } text-start hover:border-b-[3px]`}
              >
                {item.tittle}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
