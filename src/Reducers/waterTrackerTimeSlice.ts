import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MonthWaterTracker,
  SingleDayWaterTrackerData,
  WeekWaterTracker,
} from "../Types/Watertracker";
import { dummyCentralDataSrc } from "../models/waterTracker";

interface SelectedTimeState {
  selectedDay: SingleDayWaterTrackerData;
  month: MonthWaterTracker;
}

const initialState: SelectedTimeState = {
  selectedDay: dummyCentralDataSrc.selectedDay,
  month: dummyCentralDataSrc.month,
};

const selectedTimeSlice = createSlice({
  name: "water-tracker-current-month",
  initialState,
  reducers: {
    setSelectedMonth: (state, action: PayloadAction<string>) => {
      //TODO: function to set month from a date string
      console.log(action.payload);
    },
    setWeeks: (state, action: PayloadAction<Array<WeekWaterTracker>>) => {
      state.month.weeks = { ...action.payload };
    },
    setDay: (
      state,
      action: PayloadAction<{ date: string; dailyAmount: number }>
    ) => {
      const weekIndex = state.month.weeks.map((week) => {
        console.log(week.days.find((day) => day.date === action.payload.date));
      });
    },
  },
});

export const { setWeeks, setDay, setSelectedMonth } = selectedTimeSlice.actions;
export default selectedTimeSlice;
