import React from "react";
// import ToggleButton from "../../UI/ToggleButton";
import ArrowButton from "../../UI/ArrowButton";
import classes from "./CurrentDayInfo.module.css";
import "../../GlobalStyles/global-ui.css";
import { useDispatch } from "react-redux";
import {
  traverseToNextMonth,
  traverseToNextYear,
  traverseToPreviousMonth,
  traverseToPreviousYear,
} from "../../../Reducers/waterTrackerTimeSlice";

export const CurrentDayInfo: React.FC = () => {
  const dispatch = useDispatch();
  const widthInPX = 150;

  // TODO: make the switch work
  // const amountGoalSwitch = (
  //   <ToggleButton firstOption="amount" secondOption="goal" />
  // );

  // TODO: make the switch work
  // const monthWeekSwitch = (
  //   <ToggleButton firstOption="month" secondOption="week" />
  // );

  const setPreviousYear = () => {
    dispatch(traverseToPreviousYear());
  };

  const setNextYear = () => {
    dispatch(traverseToNextYear());
  };

  const setPreviousMonth = () => {
    dispatch(traverseToPreviousMonth());
  };

  const setNextMonth = () => {
    dispatch(traverseToNextMonth());
  };

  return (
    <div className={`${classes.container} watertracker_day-controls-item`}>
      <div className={classes["arrows-wrapper"]}>
        <ArrowButton
          description={"prev"}
          left={true}
          width={widthInPX}
          clickHandler={setPreviousYear}
        />
        <div className={classes["time-orientation"]}>year</div>
        <ArrowButton
          description={"next"}
          left={false}
          width={widthInPX}
          clickHandler={setNextYear}
        />
      </div>

      <div className={classes["arrows-wrapper"]}>
        <ArrowButton
          description={"prev"}
          left={true}
          width={widthInPX}
          clickHandler={setPreviousMonth}
        />
        <div className={classes["time-orientation"]}>month</div>
        <ArrowButton
          description={"next"}
          left={false}
          width={widthInPX}
          clickHandler={setNextMonth}
        />
      </div>
    </div>
  );
};
