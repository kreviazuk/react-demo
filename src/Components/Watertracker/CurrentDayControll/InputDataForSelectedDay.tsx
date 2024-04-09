import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setControlValue } from "../../../Reducers/waterTrackerControlsSlice";
import { RootState } from "../../../Store/store";

import classes from "./InputDataForCurrentDay.module.css";
import { setSelectedDayGoal } from "../../../Reducers/waterTrackerTimeSlice";

import RangeNumberInput from "../../UI/inputs/RangeNumberInput";

const MIN_VALUE = 1;
const MAX_VALUE = 24000;
const WARNING = `numbers between ${MIN_VALUE} and ${MAX_VALUE}`;
const STEP_VALUE = "increase or decrease";
const DAILY_GOAL = " daily goal";
const controlValueConf = {
  hint: STEP_VALUE,
  warning: WARNING,
  range: {
    min: MIN_VALUE,
    max: MAX_VALUE,
  },
};
const currentGoalConf = {
  hint: DAILY_GOAL,
  warning: WARNING,
  range: {
    min: MIN_VALUE,
    max: MAX_VALUE,
  },
};

const InputDataForCurrentDay: React.FC = () => {
  const controlValue = useSelector(
    (state: RootState) => state.controls.controls.controlValue
  );
  const currentGoal = useSelector(
    (state: RootState) => state.time.selectedDay.currentGoal
  );
  const selectedDayDateString = useSelector(
    (state: RootState) => state.time.selectedDay.date
  );
  const dispatch = useDispatch();

  const handleControlValue = (value: number) => {
    console.log(value);
    dispatch(setControlValue(value));
  };

  const handleCurrentGoal = (value: number) => {
    console.log(value);
    dispatch(setSelectedDayGoal(value));
  };

  return (
    <div className={`${classes.container} watertracker_day-controls-item`}>
      <RangeNumberInput
        // there won't be any changes on select so identifier will stay the same
        identifier={""}
        initValue={controlValue}
        inputConfig={controlValueConf}
        setInput={handleControlValue}
      />
      <RangeNumberInput
        // there was a logic mistake on selecting different days
        // by picking the value 1000 and then typing 0000
        // after that picking another date with the same value 1000 won't trigger any changes in useState
        // so those zeros will stay in this input field
        identifier={selectedDayDateString}
        initValue={currentGoal}
        inputConfig={currentGoalConf}
        setInput={handleCurrentGoal}
      />
    </div>
  );
};

export default InputDataForCurrentDay;
