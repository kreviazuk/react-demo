import React from "react";
import { convertFullMonth } from "../../Utils/timeUtils";
import classes from "./AddNewMonth.module.css";
import { MonthIndex } from "../../Types/Watertracker";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Store/store";

interface AddNewMonthProps {
  selectedMonth: MonthIndex;
  addNewMonth: () => void;
}

const AddNewMonth: React.FC<AddNewMonthProps> = ({
  selectedMonth,
  addNewMonth,
}) => {
  // TODO: year traverse has to work
  // const year = useSelector((state: RootState) => state.time.year.year);
  const year = new Date().getFullYear();
  return (
    <div className={`${classes["add-new-month_container"]}`}>
      <h2 className={`${classes["header"]}`}>there is nothing yet</h2>
      <div className={classes["plus"]}>
        <button className={classes["button"]} onClick={addNewMonth}>
          <span className={classes["vertical"]}></span>
          <span className={classes["horizontal"]}></span>
        </button>
      </div>
      <h3 className={`${classes["subheader"]}`}>
        {`${convertFullMonth(selectedMonth as number)} ${year}`}
      </h3>
    </div>
  );
};

export default AddNewMonth;
