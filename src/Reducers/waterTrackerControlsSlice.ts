import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ControlsWaterTracker } from "../Types/Watertracker";
import { dummyCentralDataSrc } from "../models/waterTracker";

interface ControlsState {
  controls: ControlsWaterTracker;
}

const initialState: ControlsState = {
  controls: dummyCentralDataSrc.controls,
};

const controlsSlice = createSlice({
  name: "water-tracker-controls",
  initialState,
  reducers: {
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.controls.dailyGoal = action.payload;
    },
    setControlValue: (state, action: PayloadAction<number>) => {
      state.controls.controlValue = action.payload;
    },
    setDateToControl: (state, action: PayloadAction<string>) => {
      state.controls.selectedDay = action.payload;
    },
  },
});

export const { setDailyGoal, setControlValue, setDateToControl } =
  controlsSlice.actions;
export default controlsSlice;
