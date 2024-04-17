import React, { useState } from "react";
import { Controller } from "./Controller";
import { CurrentDayInfo } from "./CurrentDayInfo";
import classes from "./CurrentDayController.module.css";
import { InputDataForCurrentDay } from "./InputDataForCurrentDay";
import "../../GlobalStyles/utils.css";
import "../../GlobalStyles/global-ui.css";
import "./CurrentDayController.css";

interface currentDayController {
  onDecrease: (value: number) => void;
  onIncrease: (value: number) => void;
  prev: () => void;
  next: () => void;
}

export const CurrentDayController = ({
  onDecrease,
  onIncrease,
  prev,
  next,
}: currentDayController) => {
  const [isHidden, setIsHidden] = useState(false);
  //TODO: Go from here
  //Setup redux to control values first
  //After that connect redux state to view

  const toggle = () => {
    setIsHidden((prev: boolean) => {
      return !prev;
    });
  };
  const content = (
    <>
      <CurrentDayInfo prev={prev} next={next} />

      <Controller onDecrease={onDecrease} onIncrease={onIncrease} />
      <InputDataForCurrentDay />
    </>
  );
  return (
    <div
      className={`marg-top-1 marg-bot-1 ${
        classes["container_day-controller"]
      } ${isHidden ? "" : classes["reverse"]}`}
    >
      <div
        className={`${classes["arrow-up"]} ${
          isHidden ? "" : classes["reverse"]
        }`}
        onClick={toggle}
      ></div>
      {isHidden ? "" : content}
    </div>
  );
};
