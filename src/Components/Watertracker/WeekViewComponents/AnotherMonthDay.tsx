import React from "react";
import styles from "./AnotherMonthDay.module.css";
import {
  convertFullMonth,
  formatedStringToDate,
} from "../../../Utils/timeUtils";

interface AnotherMonthDayProps {
  date: string;
}

const AnothertMonthDay: React.FC<AnotherMonthDayProps> = ({ date }) => {
  const dateObj = formatedStringToDate(date, "DD.MM.YYYY");
  const month = convertFullMonth(dateObj.getMonth());
  return (
    <div className={styles["inactive-day-container"]}>
      <div
        className={styles["inactive-day"]}
      >{`${dateObj.getDate()} ${month}`}</div>
    </div>
  );
};

export default AnothertMonthDay;
