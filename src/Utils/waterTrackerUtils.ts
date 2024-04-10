import {
  WeekWaterTracker,
  SingleDayWaterTrackerData,
  MonthWaterTracker,
} from "../Types/Watertracker";
import { dateToFormatedString } from "./timeUtils";

function getAverageAmount(week: SingleDayWaterTrackerData[] | []) {
  let counter = 0;
  let sum = 0;
  for (const day of week) {
    if (day.currentAmount > 0) {
      sum += day.currentAmount;
      counter++;
    }
  }
  return sum === 0 ? 0 : sum / counter;
}

function initializeMonth(
  date = new Date(),
  currentGoal = 1000,
  currentAmount = 0
): MonthWaterTracker {
  const month: MonthWaterTracker = { monthIndex: date.getMonth(), weeks: [] };
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstDayOfWeek =
    firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Adjust so Monday is index 0
  // Starting point for the calendar (potentially last month)
  let currentDay = new Date(firstDayOfMonth);
  currentDay.setDate(currentDay.getDate() - firstDayOfWeek);

  while (currentDay <= lastDayOfMonth || currentDay.getDay() !== 1) {
    const week: WeekWaterTracker = {
      weekIndex: getWeekNumber(currentDay),
      days: [],
    };

    for (let i = 0; i < 7; i++) {
      week.days.push({
        date: dateToFormatedString(currentDay, "DD.MM.YYYY"),
        currentGoal: currentGoal,
        currentAmount: currentAmount,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }

    month.weeks.push(week);
  }
  return month;
}

function getWeekNumber(date: Date): number {
  // Copy date so don't modify original
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  // Return array of year and week number
  return weekNumber;
}

/**
 *
 * @param date has to be a formated string: DD.MM.YYYY
 * @param month
 */
function getDayOutOfMonth(date: string, month: MonthWaterTracker) {
  for (const week of month.weeks) {
    for (const day of week.days) {
      if (day.date === date) {
        return day;
      }
    }
  }
  return null;
}

export { getAverageAmount, initializeMonth, getWeekNumber, getDayOutOfMonth };
