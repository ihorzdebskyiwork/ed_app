import React from "react";
import { NavLink } from "react-router-dom";

interface INavButton {
  to: {
    pathname: string;
    state?: {};
  };

  extraStyles?: string;
  text?: any;
  isDisabled?: boolean;
  handleClick?: () => any;
}

export const NavButton: React.FC<INavButton> = ({
  extraStyles,
  handleClick,
  text,
  isDisabled,
  to,
}) => {
  return (
    <div>
      <NavLink to={{ pathname: `${to.pathname}`, state: `${to.state}` }}>
        <button
          onClick={handleClick}
          className={extraStyles}
          disabled={isDisabled}
        >
          {text}
        </button>
      </NavLink>
    </div>
  );
};
