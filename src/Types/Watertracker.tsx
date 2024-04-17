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
  weeks: Array<WeekWaterTracker> | [];
}

interface WeekWaterTracker {
  weekIndex: number;
  days: Array<SingleDayWaterTrackerData> | [];
}

interface SingleDayWaterTrackerData {
  date: string;
  currentGoal: number;
  currentAmount: number;
}

interface ControlsWaterTracker {
  controlValue: number;
  dailyGoal: number;
  selectedDay: string;
}

type DateFormat = "DD.MM.YYYY";

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
};
