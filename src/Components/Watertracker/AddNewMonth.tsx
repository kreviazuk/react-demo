import React from "react";
import { convertFullMonth } from "../../Utils/Functions";
import classes from "./AddNewMonth.module.css";

interface AddNewMonthProps {
  selectedMonth: Date;
  addNewMonth: () => void;
}

const AddNewMonth: React.FC<AddNewMonthProps> = ({
  selectedMonth,
  addNewMonth,
}) => {
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
        {`${convertFullMonth(
          selectedMonth.getMonth()
        )} ${selectedMonth.getFullYear()}`}
      </h3>
    </div>
  );
};

export default AddNewMonth;
