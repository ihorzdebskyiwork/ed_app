import React, { useState, useEffect } from "react";
interface LoaderProps {
  size?: string;
  loadingTime: number;
}

export const Loader: React.FC<LoaderProps> = ({ loadingTime }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }, (loadingTime * 1000) / 100);

    return () => clearInterval(intervalId);
  }, [loadingTime, progress]);

  return (
    <div className="fixed inset-0 z-40 p-5">
      <div className="flex-col h-full w-full bg-blue-400 rounded-lg opacity-75 flex justify-center items-center">
        <p className="text-white font-bold">Loading... Please wait.</p>
        <p className="text-white">
          {progress}% completed - Approximate environment loading time is{" "}
          {loadingTime} seconds...
        </p>
        <div className="w-1/2 h-2 bg-gray-300 rounded-full mt-2">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
