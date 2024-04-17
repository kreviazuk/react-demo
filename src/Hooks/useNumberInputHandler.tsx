import React, { useState, useEffect } from "react";
import { validateRange } from "../Utils/Functions";

export const useNumberInputHandler = (
  valueNum: number,
  message: { message: string; warning: string; isActive: boolean },
  min: number,
  max: number
): {
  setInputInactive: () => number;
  handleChangeOnInput: (value: number) => void;
  submitOnEnter: (
    event: React.KeyboardEvent<HTMLInputElement>,
    inputRef: React.RefObject<HTMLInputElement>
  ) => number;
  submitOnButtonClick: (event: React.FormEvent<HTMLFormElement>) => void;
  setActiveOnFocus: () => void;
  isActive: boolean;
  inputMessage: { message: string; warning: string; isActive: boolean };
  inputValue: number;
  isValid: boolean;
} => {
  const [inputValue, setInputValue] = useState(valueNum);
  const [isActive, setIsActive] = useState(false);
  const [inputMessage, setInputMessage] = useState(message);
  const [isValid, setValid] = useState(true);

  useEffect(() => {
    setInputValue(valueNum);
  }, [valueNum]);

  const setInputInactive = () => {
    if (!isNaN(inputValue) && validateRange(inputValue, max, 99)) {
      setIsActive(false);
    } else {
      setValid(false);
      setErrorMessage();
    }
    return inputValue;
  };

  const handleChangeOnInput = (value: number) => {
    if (isNaN(value)) {
      setValid(false);
    } else {
      if (validateRange(value, max, 99)) {
        setValid(true);
      } else {
        setValid(false);
      }
    }
    setInputValue(value);
  };

  const submitOnEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    if (inputRef.current && event.key === "Enter") {
      if (!isNaN(inputValue) && validateRange(inputValue, max, 99)) {
        event.preventDefault();
        inputRef.current.blur();
        setIsActive(false);
      } else {
        setValid(false);
        setErrorMessage();
      }
    }
    return inputValue;
  };

  const submitOnButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isNaN(inputValue) && validateRange(inputValue, max, 99)) {
      setIsActive(false);
    } else {
      setValid(false);
      setErrorMessage();
    }
    return inputValue;
  };

  const setActiveOnFocus = () => {
    setIsActive(true);
  };

  function setErrorMessage() {
    setInputMessage(
      (prev: { message: string; warning: string; isActive: boolean }) => {
        prev.isActive = true;
        return { ...prev };
      }
    );
    setTimeout(() => {
      setInputMessage(
        (prev: { message: string; warning: string; isActive: boolean }) => {
          prev.isActive = false;
          return { ...prev };
        }
      );
    }, 5000);
  }

  return {
    setInputInactive,
    handleChangeOnInput,
    submitOnEnter,
    submitOnButtonClick,
    setActiveOnFocus,
    isActive,
    inputMessage,
    inputValue,
    isValid,
  };
};
