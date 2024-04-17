import React from "react";
import { MonthWaterTracker } from "../../../Types/Watertracker";
import Week from "./Week";
import "../../GlobalStyles/global-ui.css";

interface weekViewProps {
  data: MonthWaterTracker;
  setSelected: (date: Date) => void;
}

const Month: React.FC<weekViewProps> = ({
  data,
  setSelected,
}: weekViewProps) => {
  const weeksMapped = data.weeks.map((week) => {
    return (
      <Week
        key={`week_${week.weekIndex}`}
        week={week}
        setSelected={setSelected}
      />
    );
  });
  return <>{weeksMapped}</>;
};

export default Month;
