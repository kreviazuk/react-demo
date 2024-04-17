import {
  ControlsWaterTracker,
  MonthWaterTracker,
  SingleDayWaterTrackerData,
} from "../Types/Watertracker";
import { dateToFormatedString } from "../Utils/Functions";
import { initializeMonth } from "../Utils/WaterTrackerFunctions";

export default class WaterTrackerModel {
  controls: ControlsWaterTracker;
  month: MonthWaterTracker;
  selectedDay: SingleDayWaterTrackerData;
  constructor() {
    this.month = initializeMonth();
    this.controls = {
      controlValue: 100,
      dailyGoal: 1000,
      selectedDay: dateToFormatedString(new Date(), "DD.MM.YYYY"),
    };
    this.selectedDay = {
      date: dateToFormatedString(new Date(), "DD.MM.YYYY"),
      currentGoal: 1000,
      currentAmount: 0,
    };
  }
}

export const dummyCentralDataSrc = new WaterTrackerModel();
