import React from "react";
import { ProgressBarRound } from "./ProgressBarRound";
import classes from "./Controller.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";

interface controller {
  onIncrease: (value: number) => void;
  onDecrease: (value: number) => void;
}

export const Controller = ({ onDecrease, onIncrease }: controller) => {
  const controlData = useSelector(
    (state: RootState) => state.controls.controls.controlValue
  );
  const selectedDay = useSelector((state: RootState) => state.time.selectedDay);
  const increase = () => {
    onIncrease(controlData);
  };

  const decrease = () => {
    onDecrease(controlData);
  };

  const decreaseButton = (
    <div className={classes["minus"]}>
      <button onClick={decrease} className={classes["button"]}>
        <span className={classes["horizontal"]}></span>
      </button>
    </div>
  );

  return (
    <div
      className={`${classes["controller-container"]} watertracker_day-controls-item`}
    >
      <ProgressBarRound selectedDay={selectedDay} />
      <div className={classes["plus"]}>
        <button onClick={increase} className={classes["button"]}>
          <span className={classes["vertical"]}></span>
          <span className={classes["horizontal"]}></span>
        </button>
      </div>
      {selectedDay.currentAmount >= 0 &&
        selectedDay.currentAmount - controlData >= 0 &&
        decreaseButton}
    </div>
  );
};
