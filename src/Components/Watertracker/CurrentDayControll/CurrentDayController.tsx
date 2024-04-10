import React from "react";
import { Controller } from "./Controller";
import { CurrentDayInfo } from "./CurrentDayInfo";
import classes from "./CurrentDayController.module.css";
import InputDataForCurrentDay from "./InputDataForSelectedDay";
import "../../GlobalStyles/utils.css";
import "../../GlobalStyles/global-ui.css";
import "./CurrentDayController.css";

export const CurrentDayController: React.FC = () => {
  //TODO: Go from here
  //Setup redux to control values first
  //After that connect redux state to view

  return (
    <div
      className={`marg-top-1 marg-bot-1 ${classes["container_day-controller"]}`}
    >
      <CurrentDayInfo />
      <Controller />
      <InputDataForCurrentDay />
    </div>
  );
};
