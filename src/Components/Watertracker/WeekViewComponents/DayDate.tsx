import React from "react";
import { convertWeek, formatedStringToDate } from "../../../Utils/timeUtils";
import styles from "./DayDate.module.css";
import { SingleDayWaterTrackerData } from "../../../Types/Watertracker";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";

interface DayDateProps {
  data: SingleDayWaterTrackerData;
}

const DayDate: React.FC<DayDateProps> = ({ data }) => {
  const date = useSelector((state: RootState) => state.time.selectedDay.date);
  return (
    <div
      className={`${styles["single-day-info"]} ${
        data.date === date ? styles["active"] : ""
      }`}
    >
      <div className={styles["weekday"]}>{`${convertWeek(
        formatedStringToDate(data.date, "DD.MM.YYYY").getDay()
      )}`}</div>
      <div className={styles["date"]}>{`${formatedStringToDate(
        data.date,
        "DD.MM.YYYY"
      ).getDate()}`}</div>
    </div>
  );
};

export default DayDate;
