import React, { useState, FC } from "react";
import classes from "./ToggleButton.module.css";

interface ToggleButtonProps {
  firstOption: string;
  secondOption: string;
}

const ToggleButton: FC<ToggleButtonProps> = (props) => {
  const [toggler, setToggler] = useState(false);
  const handleToggler = () => {
    setToggler((prev: boolean) => {
      return !prev;
    });
  };

  return (
    <div className={`marg-bot-1 ${classes["radio-button-container"]}`}>
      <label className={classes["switch"]}>
        <input type="checkbox" onChange={handleToggler} />
        <span className={classes["slider"]}></span>
      </label>
      <div className={classes["status"]}>
        {toggler ? props.firstOption : props.secondOption}
      </div>
    </div>
  );
};

export default ToggleButton;
