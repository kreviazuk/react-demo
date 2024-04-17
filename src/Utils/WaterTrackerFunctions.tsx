import {
  singleDayWatertrackerData,
  Year,
  WeekWaterTracker,
  SingleDayWaterTrackerData,
  MonthWaterTracker,
} from "../Types/Watertracker";
import {
  getCurrentWeek,
  getIndexOfWeekday,
  getNumberOfWeek,
} from "./Functions";

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
  today = new Date(),
  currentGoal = 1000,
  currentAmount = 0
) {
  const month = {
    monthIndex: today.getMonth(),
    weeks: [] as Array<any>,
  };
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  for (
    let day = firstDayOfMonth.getDate();
    day <= lastDayOfMonth.getDate();
    day += 7
  ) {
    const dateForWeek = new Date(today.getFullYear(), today.getMonth(), day);
    const currentWeek = {
      weekIndex: getNumberOfWeek(dateForWeek),
      days: getCurrentWeek(dateForWeek),
    };

    const week: WeekWaterTracker = {
      weekIndex: getNumberOfWeek(dateForWeek),
      days: currentWeek.days.map((el) => {
        return {
          date: el.date,
          currentGoal: currentGoal,
          currentAmount: currentAmount,
        } as SingleDayWaterTrackerData;
      }),
    };

    month.weeks.push(week);
  }
  return month as MonthWaterTracker;
}

function getWeekNumber(date: Date) {
  // Copy the date so that we don't modify the original
  const newDate = new Date(date);

  // Find first monday in January
  for (let firstFour = 1; firstFour <= 4; firstFour++) {
    const dateToCheck = new Date(
      date.getFullYear(),
      date.getMonth(),
      firstFour
    );
    if (dateToCheck.getDay() === 1) {
      newDate.setMonth(0, firstFour);
      break;
    }
  }

  // Calculate the number of days and weeks
  const timeElapsed = date.getTime() - newDate.getTime();

  //Calculate the number of days and weeks
  const daysElapsed = Math.floor(timeElapsed / (24 * 3600 * 1000));
  const weekNumber = Math.ceil((daysElapsed + 1) / 7);
  return weekNumber;
}

function getSelection(date: Date, currentMonth: singleDayWatertrackerData[][]) {
  const newSelection = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const firstDayOfWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() -
      (date.getDay() === 0 ? date.getDay() + 6 : date.getDay() - 1)
  );
  const firstDayOfWeekString = `${firstDayOfWeek.getFullYear()}${firstDayOfWeek.getMonth()}${firstDayOfWeek.getDate()}`;
  for (const i in currentMonth) {
    const dateToCheck = currentMonth[i][0].date;
    let stringDateToCheck = `${dateToCheck.getFullYear()}${dateToCheck.getMonth()}${dateToCheck.getDate()}`;
    if (stringDateToCheck === firstDayOfWeekString) {
      for (const j in currentMonth[i]) {
        const day = currentMonth[i][j].date;
        stringDateToCheck = `${day.getFullYear()}${day.getMonth()}${day.getDate()}`;
        if (stringDateToCheck === newSelection) {
          return {
            weekIndex: parseInt(i),
            dayIndex: parseInt(j),
          };
        }
      }
    }
  }
  return {
    weekIndex: currentMonth.length - 1,
    dayIndex: getIndexOfWeekday(new Date().getDay()),
  };
}

function isCurrentDateEmpty(data: Year, date: Date) {
  return data[date.getFullYear()][date.getMonth()] ? false : true;
}

export {
  getAverageAmount,
  initializeMonth,
  getSelection,
  isCurrentDateEmpty,
  getWeekNumber,
};
