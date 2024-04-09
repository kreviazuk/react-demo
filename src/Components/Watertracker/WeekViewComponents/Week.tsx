import React from "react";
import {
  WeekWaterTracker,
  SingleDayWaterTrackerData,
} from "../../../Types/Watertracker";
import Day from "./Day";
import { getAverageAmount } from "../../../Utils/waterTrackerUtils";
import {
  convertFullMonth,
  formatedStringToDate,
  getNumberOfWeek,
} from "../../../Utils/timeUtils";
import styles from "./Week.module.css";

interface WeekProps {
  week: WeekWaterTracker;
}

const Week: React.FC<WeekProps> = ({ week }) => {
  const first = formatedStringToDate(week.days[0].date, "DD.MM.YYYY");
  const last = formatedStringToDate(week.days[6].date, "DD.MM.YYYY");
  const prevMonth = `${convertFullMonth(first.getMonth())}`;
  const lastMonth = `${convertFullMonth(last.getMonth())}`;
  const weekNumber = getNumberOfWeek(first);
  const average = getAverageAmount(week.days).toFixed(0);
  return (
    <div
      className={`view-container ${styles["week-view-container"]} marg-bot-1`}
    >
      <h3 className="tool-header">
        {`${weekNumber} week: ${first.getDate()} ${
          prevMonth === lastMonth ? "" : prevMonth
        } - ${last.getDate()} ${convertFullMonth(last.getMonth())}`}
      </h3>
      <h4>{`Ø ${average}`}</h4>
      <div className={styles["week-view-wrapper"]}>
        {week.days.map((el: SingleDayWaterTrackerData, i: number) => (
          <Day key={`day_${el.date}_${i}`} data={el} />
        ))}
      </div>
    </div>
  );
};

export default Week;
