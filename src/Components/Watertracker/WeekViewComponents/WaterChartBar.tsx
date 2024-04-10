import React from "react";
import styles from "./WaterChartBar.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { SingleDayWaterTrackerData } from "../../../Types/Watertracker";

interface WaterChartBarProps {
  data: SingleDayWaterTrackerData;
}

const WaterChartBar: React.FC<WaterChartBarProps> = ({ data }) => {
  const { selectedDay } = useSelector((state: RootState) => state.time);

  return (
    <div className={styles["water-chart-bar"]}>
      <div
        className={`${styles["water-chart-bar__inner"]} ${
          selectedDay === data.date ? styles["active"] : ""
        }`}
      >
        <div
          className={styles["water-chart-bar__fill"]}
          style={{
            height: `${(data.currentAmount / data.currentGoal) * 100}%`,
          }}
        ></div>
      </div>
      <div
        className={styles["progress"]}
      >{`${data.currentAmount}/${data.currentGoal}`}</div>
    </div>
  );
};

export default WaterChartBar;
