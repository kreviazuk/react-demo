import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MonthIndex,
  MonthWaterTracker,
  SingleDayWaterTrackerData,
  WeekWaterTracker,
  YearWaterTracker,
} from "../Types/Watertracker";
import { dummyCentralDataSrc } from "../models/waterTracker";
import { initializeMonth } from "../Utils/waterTrackerUtils";
import { dateToFormatedString } from "../Utils/timeUtils";

interface SelectedTimeState {
  selectedDay: SingleDayWaterTrackerData;
  month: MonthWaterTracker;
  year: YearWaterTracker;
}

const initialState: SelectedTimeState = {
  selectedDay: {
    date: dateToFormatedString(new Date(), "DD.MM.YYYY"),
    currentGoal: 1000,
    currentAmount: 0,
  },
  month: dummyCentralDataSrc.month,
  year: dummyCentralDataSrc.year,
};

const selectedTimeSlice = createSlice({
  name: "water-tracker-current-month",
  initialState,
  reducers: {
    addMonth: (
      state,
      action: PayloadAction<{ year: number; monthIndex: MonthIndex }>
    ) => {
      const yearData = { ...state.year };
      const index = action.payload.monthIndex as number;
      if (state.year.months[index].weeks.length === 0) {
        yearData.months[index] = initializeMonth(
          new Date(action.payload.year, index, 1)
        );
        state.year = { ...yearData };
      }
    },

    /**
     * @param state
     * @param action
     */
    setSelectedMonth: (
      state,
      action: PayloadAction<{ year: number; monthIndex: MonthIndex }>
    ) => {
      const newMonthSelection = state.year.months.find((el) => {
        return el.monthIndex === (action.payload.monthIndex as number);
      });
      state.month = newMonthSelection
        ? { ...newMonthSelection }
        : { monthIndex: action.payload.monthIndex as number, weeks: [] };
    },
    setWeeks: (state, action: PayloadAction<Array<WeekWaterTracker>>) => {
      state.month.weeks = { ...action.payload };
    },
    decrease: (state, action: PayloadAction<number>) => {
      if (state.month.weeks.length === 0) return;
      for (const week of state.month.weeks) {
        for (const dayIndex in week.days) {
          if (week.days[dayIndex].date === state.selectedDay.date) {
            week.days[dayIndex].currentAmount -= action.payload;
          }
        }
      }
      state.selectedDay.currentAmount -= action.payload;
    },
    increase: (state, action: PayloadAction<number>) => {
      if (state.month.weeks.length === 0) return;
      for (const week of state.month.weeks) {
        for (const dayIndex in week.days) {
          if (week.days[dayIndex].date === state.selectedDay.date) {
            week.days[dayIndex].currentAmount += action.payload;
          }
        }
      }
      state.selectedDay.currentAmount += action.payload;
    },
    setSelectedDay: (
      state,
      action: PayloadAction<SingleDayWaterTrackerData>
    ) => {
      state.selectedDay = { ...action.payload };
    },
    setSelectedDayGoal: (state, action: PayloadAction<number>) => {
      for (const week of state.month.weeks) {
        for (const dayIndex in week.days) {
          if (week.days[dayIndex].date === state.selectedDay.date) {
            week.days[dayIndex].currentGoal = action.payload;
            const selectedDay = week.days[dayIndex];
            state.selectedDay = { ...selectedDay };
            break;
          }
        }
      }
    },
  },
});

export const {
  setWeeks,
  setSelectedMonth,
  decrease,
  increase,
  setSelectedDay,
  setSelectedDayGoal,
  addMonth,
} = selectedTimeSlice.actions;
export default selectedTimeSlice;
