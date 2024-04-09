import React from "react";
import { ProgressBarRound } from "./ProgressBarRound";
import classes from "./Controller.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { decrease, increase } from "../../../Reducers/waterTrackerTimeSlice";

export const Controller: React.FC = () => {
  const dispatch = useDispatch();
  const controlValue = useSelector(
    (state: RootState) => state.controls.controls.controlValue
  );
  const selectedDay = useSelector((state: RootState) => state.time.selectedDay);
  const handleIncrease = () => {
    dispatch(increase(controlValue));
  };

  const handleDecrease = () => {
    dispatch(decrease(controlValue));
  };

  const decreaseButton = (
    <div className={classes["minus"]}>
      <button onClick={handleDecrease} className={classes["button"]}>
        <span className={classes["horizontal"]}></span>
      </button>
    </div>
  );

  return (
    <div
      className={`${classes["controller-container"]} watertracker_day-controls-item`}
    >
      <ProgressBarRound />
      <div className={classes["plus"]}>
        <button onClick={handleIncrease} className={classes["button"]}>
          <span className={classes["vertical"]}></span>
          <span className={classes["horizontal"]}></span>
        </button>
      </div>
      {selectedDay.currentAmount >= 0 &&
        selectedDay.currentAmount - controlValue >= 0 &&
        decreaseButton}
    </div>
  );
};
