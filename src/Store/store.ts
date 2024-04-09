import { configureStore } from "@reduxjs/toolkit";
import controlsSlice from "../Reducers/waterTrackerControlsSlice";
import selectedTimeSlice from "../Reducers/waterTrackerTimeSlice";

const store = configureStore({
  reducer: {
    controls: controlsSlice.reducer,
    time: selectedTimeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
