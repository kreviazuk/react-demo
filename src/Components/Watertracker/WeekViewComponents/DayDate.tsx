import React from "react";
import { convertWeek, formatedStringToDate } from "../../../Utils/Functions";
import styles from "./SingleDayInfo.module.css";
import { SingleDayWaterTrackerData } from "../../../Types/Watertracker";

interface DayDateProps {
  data: SingleDayWaterTrackerData;
}

const DayDate: React.FC<DayDateProps> = ({ data }) => {
  const date = data.date;
  return (
    <div className={styles["single-day-info"]}>
      <div className={styles["date"]}>{`${convertWeek(
        formatedStringToDate(date, "DD.MM.YYYY").getDay()
      )}`}</div>
    </div>
  );
};

export default DayDate;
