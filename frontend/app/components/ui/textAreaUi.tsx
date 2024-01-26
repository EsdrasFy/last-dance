"use client";
import { Input, Textarea } from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

interface inputProps {
  label: string;
  name: string;
  register: Function;
  change?: Function;
  maxLength?: number;
  minLength?: number
  required?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  classname?: string;
  placeholder: string;
  error?: any;
  value?: string;
  defaultvalue?: any;
}

function TextAreaUi({
  label,
  register,
  name,
  required,
  maxLength,
  minLength,
  classname,
  placeholder,
  error,
  value,
  autofocus,
  disabled,
  change,
  defaultvalue,
  ...rest
}: inputProps) {
  return (
    <ChakraProvider>
      <label className={` mb-2 text-sm text-custom-textColor`} htmlFor={name}>
        {label}
      </label>
      <Textarea
        padding=" 4px 0"
        placeholder={placeholder}
        id={name}
        borderWidth="2px"
        paddingLeft="10px"
        borderRadius={"4px"}
        focusBorderColor={"#ed145b"}
        autoFocus={autofocus}
        value={value}
        defaultValue={defaultvalue}
        onChange={change}
        disabled={disabled}
        className={`${classname} ${error ? "mb-0" : "mb-4"}`}
        {...register(`${name}`, { required, maxLength, minLength })}
      />
      <span
        className={`text-custom-red text-sm italic text-right mr-2 ${
          error ? "mb-0" : "mb-0"
        }`}
      >
        {error}
      </span>
    </ChakraProvider>
  );
}

export default TextAreaUi;
