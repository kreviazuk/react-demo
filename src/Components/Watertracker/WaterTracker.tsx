import React, { useEffect } from "react";
import Month from "./WeekViewComponents/Month";
import { CurrentDayController } from "./CurrentDayControll/CurrentDayController";
import AddNewMonth from "./AddNewMonth";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
// import { dateToFormatedString } from "../../Utils/functions";
import {
  fetchMonthData,
  setSelectedDay,
  setSelectedDayAmount,
  setSelectedDayGoal,
} from "../../Reducers/waterTrackerTimeSlice";
import { getDayOutOfMonth } from "../../Utils/waterTrackerUtils";
import { dateToFormatedString } from "../../Utils/timeUtils";

const WaterTracker: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { month } = useSelector((state: RootState) => state.time);

  useEffect(() => {
    dispatch(fetchMonthData())
      .unwrap()
      .then((res) => {
        const day = res
          ? getDayOutOfMonth(
              dateToFormatedString(new Date(), "DD.MM.YYYY"),
              res
            )
          : null;
        dispatch(setSelectedDay(day ? day : null));
        dispatch(setSelectedDayGoal(day ? day.currentGoal : null));
        dispatch(setSelectedDayAmount(day ? day.currentAmount : null));
      })
      .catch((error) => {
        // TODO: error handling
        console.log(error);
      });
  }, [dispatch]);

  const monthView = month ? <Month data={month} /> : <></>;
  const addNewMonth = <AddNewMonth />;

  return (
    <div className="container">
      <CurrentDayController />
      {!month ? addNewMonth : monthView}
    </div>
  );
};

export default WaterTracker;
