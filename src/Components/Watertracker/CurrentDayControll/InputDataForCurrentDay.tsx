import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setControlValue,
  setDailyGoal,
} from "../../../Reducers/waterTrackerControlsSlice";
import { RootState } from "../../../Store/store";
import { useNumberInputHandler } from "../../../Hooks/useNumberInputHandler";
import classes from "./InputDataForCurrentDay.module.css";

export const InputDataForCurrentDay = () => {
  const MIN_VALUE = 100;
  const MAX_VALUE = 24000;
  const WARNING = `only numbers: ${MIN_VALUE} - ${MAX_VALUE}`;
  const STEP_VALUE = "increase or decrease";
  const DAILY_GOAL = " daily goal";
  const firstInpMessage = {
    message: STEP_VALUE,
    warning: WARNING,
    isActive: false,
  };
  const secondInpMessage = {
    message: DAILY_GOAL,
    warning: WARNING,
    isActive: false,
  };
  const controlValue = useSelector(
    (state: RootState) => state.controls.controls.controlValue
  );
  const controlDailyAmount = useSelector(
    (state: RootState) => state.controls.controls.dailyGoal
  );
  const dispatch = useDispatch();
  const {
    setInputInactive: setFirstInputInactive,
    handleChangeOnInput: handleFirstChangeOnInput,
    submitOnEnter: submitFirstOnEnter,
    submitOnButtonClick: submitFirstOnButtonClick,
    setActiveOnFocus: setFirstActiveOnFocus,
    isActive: isFirstActive,
    inputMessage: firstInputMessage,
    inputValue: firstInputValue,
    isValid: isFirstValid,
  } = useNumberInputHandler(
    controlValue,
    firstInpMessage,
    MIN_VALUE,
    MAX_VALUE
  );
  const {
    setInputInactive: setSecondInputInactive,
    handleChangeOnInput: handleSecondChangeOnInput,
    submitOnEnter: submitSecondOnEnter,
    submitOnButtonClick: submitSecondOnButtonClick,
    setActiveOnFocus: setSecondActiveOnFocus,
    isActive: isSecondActive,
    inputMessage: secondInputMessage,
    inputValue: secondInputValue,
    isValid: isSecondValid,
  } = useNumberInputHandler(
    controlDailyAmount,
    secondInpMessage,
    MIN_VALUE,
    MAX_VALUE
  );
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const submitButton = (
    <button type="submit" className={classes["button-ok"]}>
      ok
    </button>
  );

  return (
    <div className={`${classes.container} watertracker_day-controls-item`}>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          submitFirstOnButtonClick(event);
        }}
        className={`form-group ${classes["form-container"]}`}
      >
        <label
          className={`form-group__label ${
            firstInputMessage.isActive ? classes["warning-text-color"] : ""
          }`}
          htmlFor="increase-or-decrease"
        >
          {firstInputMessage.isActive
            ? firstInputMessage.warning
            : firstInputMessage.message}
        </label>
        <input
          className={`form-group__input-to-edit marg-bot-1 ${
            isFirstActive ? classes["active"] : ""
          } ${firstInputMessage.isActive ? classes["red-border"] : ""}`}
          type="number"
          name="increase-or-decrease"
          value={firstInputValue}
          min={MIN_VALUE}
          max={MAX_VALUE}
          ref={firstInputRef}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            submitFirstOnEnter(event, firstInputRef);
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleFirstChangeOnInput(parseInt(event.target.value));
          }}
          onFocus={() => {
            setFirstActiveOnFocus();
          }}
          onBlur={() => {
            dispatch(setControlValue(setFirstInputInactive()));
          }}
          placeholder="...enter a value"
        />
        {isFirstValid && isFirstActive && submitButton}
      </form>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          submitSecondOnButtonClick(event);
        }}
        className={`form-group ${classes["form-container"]}`}
      >
        <label
          className={`form-group__label ${
            secondInputMessage.isActive ? classes["warning-text-color"] : ""
          }`}
          htmlFor="daily-goal-amount"
        >
          {secondInputMessage.isActive
            ? secondInputMessage.warning
            : secondInputMessage.message}
        </label>
        <input
          className={`form-group__input-to-edit marg-bot-1 ${
            isSecondActive ? classes["active"] : ""
          } ${secondInputMessage.isActive ? classes["red-border"] : ""}`}
          ref={secondInputRef}
          type="number"
          name="daily-goal-amount"
          min={MIN_VALUE}
          max={MAX_VALUE}
          value={secondInputValue}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            submitSecondOnEnter(event, secondInputRef);
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleSecondChangeOnInput(parseInt(event.target.value));
          }}
          onFocus={() => {
            setSecondActiveOnFocus();
          }}
          onBlur={() => {
            dispatch(setDailyGoal(setSecondInputInactive()));
          }}
          placeholder="...enter a value"
        />
        {isSecondValid && isSecondActive && submitButton}
      </form>
    </div>
  );
};
