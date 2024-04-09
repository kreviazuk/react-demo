import React from "react";
import classes from "./ProgressBarRound.module.css";
import { convertMonth } from "../../../Utils/timeUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import moment from "moment";

export const ProgressBarRound: React.FC = () => {
  const { selectedDay, month } = useSelector((state: RootState) => state.time);
  const date = moment(selectedDay.date, "DD.MM.YYYY").toDate();
  const dateOutput =
    month.weeks.length === 0
      ? "-- --- ----"
      : `${date.getDate()} ${convertMonth(
          date.getMonth()
        )} ${date.getFullYear()}`;

  const percentege = parseFloat(
    ((selectedDay.currentAmount / selectedDay.currentGoal) * 100).toFixed(1)
  );

  const background = `radial-gradient(closest-side, rgb(247, 247, 247) 77%, transparent 0% 100%), conic-gradient(rgb(116, 235, 213) ${percentege}%, rgb(210, 234, 241) 0)`;

  return (
    <div className={classes["progress-bar"]} style={{ background: background }}>
      <div className={classes["text-wrapper"]}>
        <div
          className={classes["text-numbers"]}
        >{`${selectedDay.currentAmount} / ${selectedDay.currentGoal} ml`}</div>
        <div className={classes["text-progress"]}>{percentege}%</div>
        <div className={classes["text-date"]}>{dateOutput}</div>
      </div>
    </div>
  );
};
