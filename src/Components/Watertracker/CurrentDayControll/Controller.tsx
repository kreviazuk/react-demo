import React from "react";
import { ProgressBarRound } from "./ProgressBarRound";
import classes from "./Controller.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store/store";
import { updateDailyAmount } from "../../../Reducers/waterTrackerTimeSlice";

export const Controller: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const controlValue = useSelector(
    (state: RootState) => state.controls.controls.controlValue
  );
  const { currentAmount, selectedDay } = useSelector(
    (state: RootState) => state.time
  );
  const handleIncrease = () => {
    if (selectedDay)
      dispatch(updateDailyAmount({ date: selectedDay, amount: controlValue }));
  };

  const handleDecrease = () => {
    if (selectedDay)
      dispatch(updateDailyAmount({ date: selectedDay, amount: -controlValue }));
  };

  const decreaseButton = selectedDay &&
    currentAmount !== null &&
    currentAmount >= 0 &&
    currentAmount - controlValue >= 0 && (
      <div className={classes["minus"]}>
        <button onClick={handleDecrease} className={classes["button"]}>
          <span className={classes["horizontal"]}></span>
        </button>
      </div>
    );

  const increaseButton = selectedDay && (
    <div className={classes["plus"]}>
      <button onClick={handleIncrease} className={classes["button"]}>
        <span className={classes["vertical"]}></span>
        <span className={classes["horizontal"]}></span>
      </button>
    </div>
  );

  return (
    <div
      className={`${classes["controller-container"]} watertracker_day-controls-item`}
    >
      <ProgressBarRound />
      {increaseButton}
      {decreaseButton}
    </div>
  );
};
