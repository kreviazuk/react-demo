import { DateFormat, singleDayWatertrackerData } from "../Types/Watertracker";
import moment from "moment";

function convertMonth(month: number) {
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthArray[month];
}

function convertFullMonth(month: number) {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthArray[month];
}

function convertWeek(day: number) {
  const weekdayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdayArr[day];
}

function getIndexOfWeekday(day: number) {
  const weekdayArr = [6, 0, 1, 2, 3, 4, 5];
  return weekdayArr[day];
}

function getCurrentWeek(currentDate = new Date()) {
  const firstDayOfCurrentWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() -
      (currentDate.getDay() === 0
        ? currentDate.getDay() + 6
        : currentDate.getDay() - 1)
  );
  const currentWeek = [];
  for (let i = 0; i < 7; i++) {
    currentWeek.push({
      date: dateToFormatedString(
        new Date(
          firstDayOfCurrentWeek.getFullYear(),
          firstDayOfCurrentWeek.getMonth(),
          firstDayOfCurrentWeek.getDate() + i
        ),
        "DD.MM.YYYY"
      ),
    });
  }
  return currentWeek;
}

function getCurrentDay(
  completeWaterTrackerData: singleDayWatertrackerData[],
  currentGoal = 1000
) {
  if (completeWaterTrackerData) {
    for (const el of completeWaterTrackerData) {
      if (el.date.toDateString() === new Date().toDateString()) return el;
    }
  }
  return { date: new Date(), currentGoal: currentGoal, currentAmount: 0 };
}

function validateRange(input: number, max: number, min: number) {
  if (input <= max && input >= min) return true;
  return false;
}

function getNumberOfWeek(date: Date) {
  const startDate = new Date(`1 January ${date.getFullYear()}`);
  const days = Math.floor(
    (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil(days / 7) + 1;
}

function dateToFormatedString(date: Date, formatValue: DateFormat) {
  return moment(date).format(formatValue).toString();
}

function formatedStringToDate(date: string, formatValue: DateFormat) {
  return moment(date, formatValue).toDate();
}

export {
  convertMonth,
  convertFullMonth,
  convertWeek,
  getCurrentWeek,
  getCurrentDay,
  getNumberOfWeek,
  validateRange,
  getIndexOfWeekday,
  dateToFormatedString,
  formatedStringToDate,
};
