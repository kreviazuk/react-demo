import React from "react";
import { convertWeek, formatedStringToDate } from "../../../Utils/timeUtils";
import styles from "./DayDate.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { SingleDayWaterTrackerData } from "../../../Types/Watertracker";

interface DayDateProps {
  data: SingleDayWaterTrackerData;
}

const DayDate: React.FC<DayDateProps> = ({ data }) => {
  const { selectedDay } = useSelector((state: RootState) => state.time);
  return (
    <div
      className={`${styles["single-day-info"]} ${
        data.date === selectedDay ? styles["active"] : ""
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
