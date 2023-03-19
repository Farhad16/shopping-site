import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { IInputProps } from "./interfaces/input.interface";

function FormInput({
  containerClass,
  controllerClassName,
  inputClassName,
  control,
  error,
  label,
  rules,
  placeholder,
  name,
  type,
}: IInputProps) {
  return (
    <div className={containerClass}>
      <span className="font-semibold">{label}</span>
      <div className={controllerClassName}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={placeholder}
              fullWidth
              size="small"
              color="primary"
              type={type}
              autoFocus
              inputProps={{
                className: inputClassName,
              }}
            />
          )}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default FormInput;
