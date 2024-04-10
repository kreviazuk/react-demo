import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  MonthIndex,
  MonthWaterTracker,
  SingleDayWaterTrackerData,
  WaterTrackerUpdateAmount,
  WeekWaterTracker,
  YearWaterTracker,
} from "../Types/Watertracker";
import { dummyCentralDataSrc } from "../models/waterTracker";
import { initializeMonth } from "../Utils/waterTrackerUtils";

interface SelectedTimeState {
  selectedDay: string | null;
  currentAmount: number | null;
  currentGoal: number | null;
  selectedMonth: number;
  month: MonthWaterTracker | null;
  selectedYear: number;
  year: YearWaterTracker;
  loading: boolean;
  error: SerializedError | string | null;
}

const initialState: SelectedTimeState = {
  selectedDay: null,
  currentAmount: null,
  currentGoal: null,
  selectedMonth: new Date().getMonth(),
  month: null,
  year: dummyCentralDataSrc.year,
  selectedYear: new Date().getFullYear(),
  loading: false,
  error: null,
};

// Async thunk for fetching month data
export const fetchMonthData = createAsyncThunk(
  "data/fetchMonthData",
  async () => {
    const response = await axios.get("http://localhost:5000/");
    return response.data as MonthWaterTracker | null;
  }
);

// Async thunk for fetching month data
export const updateDailyAmount = createAsyncThunk(
  "data/updateDailyAmount",
  async (payloadData: WaterTrackerUpdateAmount) => {
    const response = await axios.put(
      "http://localhost:5000/update-amount/",
      payloadData
    );
    return response.data as SingleDayWaterTrackerData;
  }
);

const selectedTimeSlice = createSlice({
  name: "water-tracker-current-month",
  initialState,
  reducers: {
    traverseToNextMonth: (state) => {
      if (state.selectedMonth < 11) {
        state.selectedMonth++;
      } else {
        state.selectedMonth = 0;
      }
    },
    traverseToPreviousMonth: (state) => {
      if (state.selectedMonth <= 0) {
        state.selectedMonth = 11;
      } else {
        state.selectedMonth--;
      }
    },
    traverseToNextYear: (state) => {
      const year = new Date().getFullYear();

      // limitation +10 years
      if (state.selectedYear <= year + 10) {
        state.selectedYear++;
      } else {
        state.selectedYear = year;
      }
    },
    traverseToPreviousYear: (state) => {
      const year = new Date().getFullYear();

      // limitation -10 years
      if (state.selectedYear >= year - 10) {
        state.selectedYear--;
      } else {
        state.selectedYear = year;
      }
    },
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
      if (state.month) {
        state.month.weeks = { ...action.payload };
      }
    },
    setSelectedDay: (
      state,
      action: PayloadAction<SingleDayWaterTrackerData | null>
    ) => {
      if (action.payload) {
        const { date, currentAmount, currentGoal } = action.payload;
        state.selectedDay = date;
        state.currentAmount = currentAmount;
        state.currentGoal = currentGoal;
      } else {
        state.selectedDay = null;
        state.currentAmount = null;
        state.currentGoal = null;
      }
    },
    setSelectedDayGoal: (state, action: PayloadAction<number | null>) => {
      state.currentGoal = action.payload;
    },
    setSelectedDayAmount: (state, action: PayloadAction<number | null>) => {
      state.currentAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Month data
    builder
      .addCase(fetchMonthData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMonthData.fulfilled,
        (state, action: PayloadAction<MonthWaterTracker | null>) => {
          const monthData = action.payload;
          state.loading = false;
          state.month = monthData ? { ...monthData } : null;
        }
      )
      .addCase(fetchMonthData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error || "something went wrong";
      });
    // Update daily amount
    builder
      .addCase(updateDailyAmount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateDailyAmount.fulfilled,
        (state, action: PayloadAction<SingleDayWaterTrackerData | null>) => {
          state.loading = false;
          const updatedDay = action.payload;
          if (updatedDay && state.month) {
            const { currentAmount } = updatedDay;
            state.selectedDay = updatedDay.date;
            state.currentAmount = updatedDay.currentAmount;
            for (const week of state.month.weeks) {
              for (const day of week.days) {
                if (day.date === updatedDay.date) {
                  day.currentAmount = currentAmount;
                }
              }
            }
          }
        }
      )
      .addCase(updateDailyAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error || "something went wrong";
      });
  },
});

export const {
  traverseToNextYear,
  traverseToPreviousYear,
  traverseToNextMonth,
  traverseToPreviousMonth,
  setWeeks,
  setSelectedMonth,
  setSelectedDay,
  setSelectedDayGoal,
  setSelectedDayAmount,
  addMonth,
} = selectedTimeSlice.actions;
export default selectedTimeSlice;
