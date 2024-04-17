import React, { useState } from "react";
import Month from "./WeekViewComponents/Month";
import { CurrentDayController } from "./CurrentDayControll/CurrentDayController";
import AddNewMonth from "./AddNewMonth";
import { getSelection } from "../../Utils/WaterTrackerFunctions";
import { initializeMonth } from "../../Utils/WaterTrackerFunctions";
import {
  completeWaterTrackerData,
  singleDayWatertrackerData,
} from "../../Types/Watertracker";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/store";
import { dateToFormatedString } from "../../Utils/Functions";
import { setSelectedMonth } from "../../Reducers/waterTrackerTimeSlice";

const WaterTracker: React.FC = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(
    (state: RootState) => state.time.month.monthIndex
  );
  const selectedMonthData = useSelector((state: RootState) => state.time.month);
  const next = () => {
    const nextMonth = dateToFormatedString(
      new Date(
        new Date().getFullYear(),
        selectedMonth + 1,
        new Date().getDate()
      ),
      "DD.MM.YYYY"
    );
    dispatch(setSelectedMonth(nextMonth));
  };

  const prev = () => {
    const prevMonth = dateToFormatedString(
      new Date(
        new Date().getFullYear(),
        selectedMonth - 1,
        new Date().getDate()
      ),
      "DD.MM.YYYY"
    );
    dispatch(setSelectedMonth(prevMonth));
  };

  const onDecreaseHandler = (value: number) => {
    // setCurrentMonth((prev: singleDayWatertrackerData[][]) => {
    //   prev[selectedDay.weekIndex][selectedDay.dayIndex].currentAmount -= value;
    //   return [...prev];
    // });
  };

  const onIncreaseHandler = (value: number) => {
    // setCurrentMonth((prev: singleDayWatertrackerData[][]) => {
    //   prev[selectedDay.weekIndex][selectedDay.dayIndex].currentAmount += value;
    //   return [...prev];
    // });
  };

  //TODO: update this function so each day can be updated as a single unit
  const onUpdateDailyAmount = (value: number) => {
    // setCurrentMonth((prev: singleDayWatertrackerData[][]) => {
    //   prev[selectedDay.weekIndex][selectedDay.dayIndex].currentGoal = value;
    //   return [...prev];
    // });
  };

  const setSelectedHadler = (date: Date) => {
    // setSelectedDay(getSelection(date, currentMonth));
  };

  //TODO: add new month on a button click
  // const addNewMonthHandler = () => {
  //   console.log(initializeMonth(selectedMonth));
  // };

  console.log("currentMonth", selectedMonthData);

  const MonthView = (
    <Month data={selectedMonthData} setSelected={setSelectedHadler} />
  );

  // const addNewMonth = (
  //   <AddNewMonth
  //     selectedMonth={selectedMonth}
  //     addNewMonth={addNewMonthHandler}
  //   />
  // );

  return (
    <div className="container">
      <CurrentDayController
        onDecrease={onDecreaseHandler}
        onIncrease={onIncreaseHandler}
        prev={prev}
        next={next}
      />
      {MonthView}
      {/* {isCurrentDateEmpty(completeWaterTrackerData.data, selectedMonth)
        ? addNewMonth
        : MonthView} */}
    </div>
  );
};

export default WaterTracker;
