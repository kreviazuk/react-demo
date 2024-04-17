import React from "react";
import classes from "./ProgressBarRound.module.css";
import { convertMonth } from "../../../Utils/Functions";
import { SingleDayWaterTrackerData } from "../../../Types/Watertracker";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import moment from "moment";

interface progressBarRound {
  selectedDay: SingleDayWaterTrackerData;
}

export const ProgressBarRound = ({ selectedDay }: progressBarRound) => {
  const date = moment(
    useSelector((state: RootState) => state.controls.controls.selectedDay),
    "DD.MM.YYYY"
  ).toDate();
  // useSelector((state: RootState) => state.controls.controls.selectedDay.date)

  const percentege = parseFloat(
    ((selectedDay.currentAmount / selectedDay.currentGoal) * 100).toFixed(1)
  );
  console.log(date);
  const background = `radial-gradient(closest-side, rgb(247, 247, 247) 77%, transparent 0% 100%), conic-gradient(rgb(116, 235, 213) ${percentege}%, rgb(210, 234, 241) 0)`;
  return (
    <div className={classes["progress-bar"]} style={{ background: background }}>
      <div className={classes["text-wrapper"]}>
        <div
          className={classes["text-numbers"]}
        >{`${selectedDay.currentAmount} / ${selectedDay.currentGoal} ml`}</div>
        <div className={classes["text-progress"]}>{percentege}%</div>
        <div
          className={classes["text-date"]}
        >{`${date.getDate()} ${convertMonth(
          date.getMonth()
        )} ${date.getFullYear()}`}</div>
      </div>
    </div>
  );
};
