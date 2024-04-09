import React from "react";
import { MonthWaterTracker } from "../../../Types/Watertracker";
import Week from "./Week";
import "../../GlobalStyles/global-ui.css";

interface weekViewProps {
  data: MonthWaterTracker;
}

const Month: React.FC<weekViewProps> = ({ data }: weekViewProps) => {
  const weeksMapped = data.weeks.map((week) => {
    return (
      <Week
        key={`week_${week.weekIndex}_${week.days[0].date}_${
          week.days[week.days.length - 1].date
        }`}
        week={week}
      />
    );
  });
  return <>{weeksMapped}</>;
};

export default Month;
