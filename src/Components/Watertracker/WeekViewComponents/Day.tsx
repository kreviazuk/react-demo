import React from "react";
import WatterChartBar from "./WaterChartBar";
import DayDate from "./DayDate";
import { SingleDayWaterTrackerData } from "../../../Types/Watertracker";
import styles from "./Chart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "../../../Reducers/waterTrackerTimeSlice";
import { RootState } from "../../../Store/store";
import { formatedStringToDate } from "../../../Utils/timeUtils";
import AnothertMonthDay from "./AnotherMonthDay";

interface DayProp {
  data: SingleDayWaterTrackerData;
}

const Day: React.FC<DayProp> = ({ data }) => {
  const month = useSelector((state: RootState) => state.time.month.monthIndex);
  const dispath = useDispatch();
  const select = () => {
    dispath(setSelectedDay(data));
  };

  const content =
    formatedStringToDate(data.date, "DD.MM.YYYY").getMonth() === month ? (
      <div className={styles["day"]} onClick={select}>
        <WatterChartBar data={data} />
        <DayDate data={data} />
      </div>
    ) : (
      <AnothertMonthDay date={data.date} />
    );

  return <div className={styles["day-container"]}>{content}</div>;
};

export default Day;
