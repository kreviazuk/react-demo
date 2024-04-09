import React, { useRef, useState } from "react";
import classes from "./RangeNumberInput.module.css";
import { validateRange } from "../../../Utils/timeUtils";

interface RangeNumberInputProps {
  identifier: string;
  initValue: number;
  inputConfig: {
    hint: string;
    warning: string;
    range: {
      min: number;
      max: number;
    };
  };
  setInput: (value: number) => void;
}

const RangeNumberInput: React.FC<RangeNumberInputProps> = ({
  identifier,
  initValue,
  inputConfig,
  setInput: setValue,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState(identifier);
  const [inputValue, setInputValue] = useState(initValue);
  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(true);

  if (id !== identifier) {
    setId(identifier);
    setIsValid(
      !isNaN(initValue) &&
        validateRange(initValue, inputConfig.range.max, inputConfig.range.min)
    );
    setIsActive(false);
    setInputValue(initValue);
  }

  const handleInputField = (value: number) => {
    setInputValue(value);
    setIsValid(
      !isNaN(value) &&
        validateRange(value, inputConfig.range.max, inputConfig.range.min)
    );
  };

  const validateInputValue = (value: number) => {
    if (
      !isNaN(value) &&
      validateRange(value, inputConfig.range.max, inputConfig.range.min)
    ) {
      setValue(value);
      setIsActive(false);
    } else {
      setIsValid(false);
    }
  };

  const submitButton = (
    <button
      type="submit"
      onClick={(event) => {
        event.preventDefault();
        validateInputValue(inputValue);
      }}
      className={classes["button-ok"]}
    >
      ok
    </button>
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        validateInputValue(inputValue);
      }}
      className={`form-group ${classes["form-container"]}`}
    >
      <label
        className={`form-group__label ${
          !isValid ? classes["warning-text-color"] : ""
        }`}
        htmlFor="increase-or-decrease"
      >
        {!isValid ? inputConfig.warning : inputConfig.hint}
      </label>
      <input
        className={`form-group__input-to-edit marg-bot-1`}
        type="number"
        name="increase-or-decrease"
        value={inputValue}
        min={inputConfig.range.min}
        max={inputConfig.range.max}
        ref={firstInputRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleInputField(parseInt(event.currentTarget.value));
        }}
        onFocus={(event: React.FocusEvent<HTMLInputElement, Element>) => {
          setIsActive(true);
        }}
        onBlur={() => {
          validateInputValue(inputValue);
        }}
        placeholder="...enter a value"
      />
      {isActive && isValid && submitButton}
    </form>
  );
};

export default RangeNumberInput;
