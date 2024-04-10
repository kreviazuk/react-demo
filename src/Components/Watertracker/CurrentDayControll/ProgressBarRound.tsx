import React from "react";
import classes from "./ProgressBarRound.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";

export const ProgressBarRound: React.FC = () => {
  const { selectedDay, currentAmount, currentGoal } = useSelector(
    (state: RootState) => state.time
  );
  const dateOutput = !selectedDay ? "no date selected" : selectedDay;

  const percentege =
    currentAmount && currentGoal
      ? parseFloat(((currentAmount / currentGoal) * 100).toFixed(1))
      : 0;

  const background = `radial-gradient(closest-side, rgb(247, 247, 247) 77%, transparent 0% 100%), conic-gradient(rgb(116, 235, 213) ${percentege}%, rgb(210, 234, 241) 0)`;

  return (
    <div className={classes["progress-bar"]} style={{ background: background }}>
      <div className={classes["text-wrapper"]}>
        {selectedDay && (
          <>
            <div className={classes["text-numbers"]}>{`${
              currentAmount ? currentAmount : 0
            } / ${currentGoal ? currentGoal : 0} ml`}</div>
            <div className={classes["text-progress"]}>{percentege}%</div>
          </>
        )}

        <div className={classes["text-date"]}>{dateOutput}</div>
      </div>
    </div>
  );
};
