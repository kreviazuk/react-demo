import React from "react";
import Month from "./WeekViewComponents/Month";
import { CurrentDayController } from "./CurrentDayControll/CurrentDayController";
import AddNewMonth from "./AddNewMonth";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/store";
// import { dateToFormatedString } from "../../Utils/functions";
import {
  addMonth,
  setSelectedMonth,
} from "../../Reducers/waterTrackerTimeSlice";
import { MonthIndex } from "../../Types/Watertracker";

const WaterTracker: React.FC = () => {
  const dispatch = useDispatch();
  // TODO: proper time traverse
  // const year = useSelector((state: RootState) => state.time.year.year);
  const year = new Date().getFullYear();
  const selectedMonth = useSelector(
    (state: RootState) => state.time.month.monthIndex
  );
  const selectedMonthData = useSelector((state: RootState) => state.time.month);
  const next = () => {
    const nextMonth =
      selectedMonth + 1 >= 0 && selectedMonth + 1 < 12
        ? selectedMonth + 1
        : selectedMonth;
    dispatch(
      setSelectedMonth({ year: year, monthIndex: nextMonth as MonthIndex })
    );
  };

  const prev = () => {
    const prevMonth =
      selectedMonth - 1 >= 0 && selectedMonth - 1 < 12
        ? selectedMonth - 1
        : selectedMonth;
    console.log(prevMonth);
    dispatch(
      setSelectedMonth({ year: year, monthIndex: prevMonth as MonthIndex })
    );
  };

  const addNewMonthHandler = () => {
    const monthSelcetion = {
      year: year,
      monthIndex: selectedMonth as MonthIndex,
    };
    dispatch(addMonth(monthSelcetion));
    dispatch(setSelectedMonth(monthSelcetion));
  };

  const MonthView = <Month data={selectedMonthData} />;

  const addNewMonth = (
    <AddNewMonth
      selectedMonth={selectedMonth as MonthIndex}
      addNewMonth={addNewMonthHandler}
    />
  );

  return (
    <div className="container">
      <CurrentDayController prev={prev} next={next} />
      {selectedMonthData.weeks.length === 0 ? addNewMonth : MonthView}
    </div>
  );
};

export default WaterTracker;
