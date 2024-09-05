import React from "react";
interface IButton {
  extraStyles?: string;
  text?: string;
  isDisabled?: boolean;
  handleClick?: () => any;
}
export const Button: React.FC<IButton> = ({
  extraStyles,
  handleClick,
  text,
  isDisabled,
}) => {
  return (
    <div>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        className={extraStyles}
      >
        {text}
      </button>
    </div>
  );
};
