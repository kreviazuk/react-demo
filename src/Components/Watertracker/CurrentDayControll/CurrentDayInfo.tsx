import React, { useState } from "react";
import ToggleButton from "../../UI/ToggleButton";
import ArrowButton from "../../UI/ArrowButton";
import { singleDayWatertrackerData } from "../../../Types/Watertracker";
import classes from "./CurrentDayInfo.module.css";
import "../../GlobalStyles/global-ui.css";

interface CurrentDayInfoProps {
  prev: () => void;
  next: () => void;
}

export const CurrentDayInfo: React.FC<CurrentDayInfoProps> = ({
  prev,
  next,
}) => {
  const widthInPX = 150;
  return (
    <div className={`${classes.container} watertracker_day-controls-item`}>
      <ToggleButton firstOption="amount" secondOption="goal" />
      <ToggleButton firstOption="month" secondOption="week" />
      <div className={classes["arrows-wrapper"]}>
        <ArrowButton
          description={"prev"}
          left={true}
          width={widthInPX}
          clickHandler={prev}
        />
        <div className={classes["time-orientation"]}>month</div>
        <ArrowButton
          description={"next"}
          left={false}
          width={widthInPX}
          clickHandler={next}
        />
      </div>
    </div>
  );
};
