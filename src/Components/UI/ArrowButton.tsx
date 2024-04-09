import React from "react";
import classes from "./ArrowButton.module.css";

interface ArrowButtonProps {
  description: string;
  left: boolean;
  width: number;
  clickHandler: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  description,
  left,
  width,
  clickHandler,
}) => {
  const divStyle: React.CSSProperties = {
    width: width,
  };
  return (
    <div className={classes["wrapper"]} style={divStyle} onClick={clickHandler}>
      <div
        className={`${classes["arrow"]} ${
          classes[`arrow--${left ? "left" : "right"}`]
        }`}
      >
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ArrowButton;
