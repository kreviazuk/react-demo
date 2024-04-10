import React from "react";
import DayDate from "./DayDate";
import { SingleDayWaterTrackerData } from "../../../Types/Watertracker";
import styles from "./Chart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "../../../Reducers/waterTrackerTimeSlice";
import { RootState } from "../../../Store/store";
import { formatedStringToDate } from "../../../Utils/timeUtils";
import AnothertMonthDay from "./AnotherMonthDay";
import WaterChartBar from "./WaterChartBar";

interface DayProp {
  data: SingleDayWaterTrackerData;
}

const Day: React.FC<DayProp> = ({ data }) => {
  const month = useSelector((state: RootState) =>
    state.time.month ? state.time.month.monthIndex : null
  );
  const dispath = useDispatch();
  const select = () => {
    dispath(setSelectedDay(data));
  };

  const content =
    formatedStringToDate(data.date, "DD.MM.YYYY").getMonth() === month ? (
      <div className={styles["day"]} onClick={select}>
        <WaterChartBar data={data} />
        <DayDate data={data} />
      </div>
    ) : (
      <AnothertMonthDay date={data.date} />
    );

  return <div className={styles["day-container"]}>{month && content}</div>;
};

export default Day;
