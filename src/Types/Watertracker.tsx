interface singleDayWatertrackerData {
  date: Date;
  currentGoal: number;
  currentAmount: number;
}

interface completeWaterTrackerData {
  controls: ControlsWatertracker;
  data: Year;
}

interface Year {
  [year: number]: Month;
}

interface Month {
  [month: number]: singleDayWatertrackerData[][];
}

interface ControlsWatertracker {
  control_value: number;
  daily_goal: number;
}

interface YearWaterTracker {
  year: number;
  months: Array<MonthWaterTracker> | [];
}

interface MonthWaterTracker {
  monthIndex: number;
  weeks: Array<WeekWaterTracker>;
}

interface WeekWaterTracker {
  weekIndex: number;
  days: Array<SingleDayWaterTrackerData>;
}

interface SingleDayWaterTrackerData {
  date: string;
  currentGoal: number;
  currentAmount: number;
}

interface ControlsWaterTracker {
  controlValue: number;
  dailyGoal: number;
}

interface WaterTrackerUpdateAmount {
  date: string;
  amount: number;
}

type DateFormat = "DD.MM.YYYY";

type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type {
  singleDayWatertrackerData,
  SingleDayWaterTrackerData,
  completeWaterTrackerData,
  Year,
  Month,
  YearWaterTracker,
  MonthWaterTracker,
  ControlsWatertracker,
  WeekWaterTracker,
  ControlsWaterTracker,
  DateFormat,
  MonthIndex,
  WaterTrackerUpdateAmount,
};
