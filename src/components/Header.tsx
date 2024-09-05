import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { logOutUserThunk } from "../redux/auth/operations";
import { selectIsAuth } from "../redux/auth/selectors";
// import { selectIsActiveSession } from "../redux/examSession/selectors";
// import { stopSessionThunk } from "../redux/examSession/operations";
// import { clearStateSessionExam } from "../redux/examSession/sessionReducer";

import logo from "../assets/practicert_logo.png";
import userIcon from "../assets/svgexport-1.svg";
import userLogout from "../assets/svglogout-6.svg";
import { NavButton } from "./NavButton";

export const Header = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  // const isActiveSession = useSelector(selectIsActiveSession);

  return (
    <div className="flex justify-between px-10 shadow-xl fixed top-0 z-50 w-full mb-36 bg-white">
      <div className="flex justify-start items-center">
        <a href="/playground.practicert.sh">
          <img src={logo} alt="Logo" className="mb-8px mr-24 h-56px" />
        </a>
        <div className="flex gap-5 items-center justify-center">
          <a href="/home" className="font-bold text-lg">
            Solution
          </a>
          <a href="/home" className="font-bold text-lg">
            Contact
          </a>
        </div>
      </div>
      <div className="flex  gap-5 justify-start items-center">
        {!isAuth ? (
          <NavButton
            to={{
              pathname: "/login",
            }}
            text="Login"
            extraStyles="justify-center items-center border-2 h-10 w-32 pl-10 pr-10 text-center bg-blue-400 hover:bg-blue-500 text-white rounded-xl font-semibold duration-300"
          />
        ) : (
          <>
            <img src={userIcon} alt="logo76" />
            <button
              onClick={() => {
                dispatch(logOutUserThunk());
                // if (isActiveSession) {
                //   dispatch(stopSessionThunk());
                //   dispatch(clearStateSessionExam());
                // }
              }}
            >
              <img src={userLogout} alt="logout" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
