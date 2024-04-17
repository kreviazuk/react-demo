import React from "react";
import WatterChartBar from "./WaterChartBar";
import DayDate from "./DayDate";
import { SingleDayWaterTrackerData } from "../../../Types/Watertracker";
import styles from "./Chart.module.css";
import { useDispatch } from "react-redux";
import { setDateToControl } from "../../../Reducers/waterTrackerControlsSlice";
import { dateToFormatedString } from "../../../Utils/Functions";

interface DayProp {
  data: SingleDayWaterTrackerData;
}

const Day: React.FC<DayProp> = ({ data }) => {
  const dispath = useDispatch();
  const select = () => {
    const selectedDay = {
      date: data.date,
      currentGoal: data.currentGoal,
      currentAmount: data.currentAmount,
    };
    dispath(setDateToControl(selectedDay.date));
  };

  return (
    <div onClick={select} className={styles["chart-container"]}>
      <WatterChartBar chartBarData={data} />
      <DayDate data={data} />
    </div>
  );
};

export default Day;
