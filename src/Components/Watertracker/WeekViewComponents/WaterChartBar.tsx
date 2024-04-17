import React from "react";
import styles from "./WaterChartBar.module.css";

interface ChartBarProps {
  chartBarData: {
    currentGoal: number;
    currentAmount: number;
  };
}

const WatterChartBar = (props: ChartBarProps) => {
  return (
    <div className={styles["water-chart-bar"]}>
      <div className={styles["water-chart-bar__inner"]}>
        <div
          className={styles["water-chart-bar__fill"]}
          style={{
            height: `${
              (props.chartBarData.currentAmount /
                props.chartBarData.currentGoal) *
              100
            }%`,
          }}
        ></div>
      </div>
      <div
        className={styles["progress"]}
      >{`${props.chartBarData.currentAmount}/${props.chartBarData.currentGoal}`}</div>
    </div>
  );
};

export default WatterChartBar;
