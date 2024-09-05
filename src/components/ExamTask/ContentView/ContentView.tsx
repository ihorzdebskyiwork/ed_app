import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectIpAddress,
  selectIsTerminal,
} from "../../../redux/examSession/selectors";

interface IProps {}

export const ContentView: React.FC<IProps> = () => {
  const [htmlPage, setHtmlPage] = useState<string>("");

  const IP_ADDRESS = useSelector(selectIpAddress);
  const isTerminal = useSelector(selectIsTerminal);

  useEffect(() => {
    if (isTerminal) {
      setHtmlPage(`http://${IP_ADDRESS}:8082`);
    }
  }, [isTerminal]);
  // }, [IP_ADDRESS, isTerminal]);

  // useEffect(() => {
  //   setHtmlPage(`http://${IP_ADDRESS}:8082`);
  // }, []);

  return (
    <div className="h-full bg-neutral-100 rounded-xl mr-10 ml-10 mt-80px mb-20px">
      {htmlPage && (
        <iframe
          title="Terminal"
          src={htmlPage}
          // srcDoc={htmlPage}
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        />
      )}
    </div>
  );
};
