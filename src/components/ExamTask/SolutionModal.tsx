import React from "react";

interface ISolutionModal {
  setShowModal: any;
  solutions: any[];
  selectedTaskIndex: number;
}

export const SolutionModal: React.FC<ISolutionModal> = ({
  setShowModal,
  solutions,
  selectedTaskIndex,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => setShowModal(false)}
      >
        <div
          className="bg-white p-5 rounded shadow-lg w-[50%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg mx-auto">Solution</h2>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
          <div>
            <ul className="overflow-y-auto h-72">
              {solutions && (
                <li
                  key={selectedTaskIndex}
                  className={`flex ${
                    selectedTaskIndex === solutions.length - 1 ? "" : "mb-12px"
                  }`}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `<span style="font-weight: 600; margin-right: 0.2rem;">${
                        selectedTaskIndex + 1
                      }.</span> ${solutions[selectedTaskIndex]}`,
                    }}
                  ></p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
