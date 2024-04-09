import {
  ControlsWaterTracker,
  MonthWaterTracker,
  SingleDayWaterTrackerData,
  YearWaterTracker,
} from "../Types/Watertracker";
import { dateToFormatedString } from "../Utils/timeUtils";
import { dummyYear } from "./yearData";

export default class WaterTrackerModel {
  controls: ControlsWaterTracker;
  month: MonthWaterTracker;
  year: YearWaterTracker;
  selectedDay: SingleDayWaterTrackerData;
  constructor() {
    this.year = dummyYear;
    this.month = this.initSelectedMonth();
    this.controls = {
      controlValue: 100,
      dailyGoal: 1000,
    };
    this.selectedDay = {
      date: dateToFormatedString(new Date(), "DD.MM.YYYY"),
      currentGoal: 1000,
      currentAmount: 0,
    };
  }

  // TODO: fetch fucntion which gets data month after month
  initSelectedMonth() {
    return dummyYear.months[new Date().getMonth()];
  }

  // TODO: init empty year so months on traverse can be added without sending too many requests
  initEmptyYear(year: number) {}
}

export const dummyCentralDataSrc = new WaterTrackerModel();
