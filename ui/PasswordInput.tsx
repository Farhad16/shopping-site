import { useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

function PasswordInput({
  controllerClassName,
  inputClassName,
  control,
  error,
  label,
  name,
  placeholder,
  onBlur,
}: any) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <span className="font-semibold">{label}</span>
      <div className={`${controllerClassName}, mt-2`}>
        <Controller
          name={name}
          control={control}
          rules={{
            required: { message: "Password required", value: true },
            minLength: {
              value: 6,
              message: "password is more than 6 chars",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={placeholder}
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              color="primary"
              inputProps={{
                className: inputClassName,
              }}
              onBlur={onBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {error && <p className="text-sm font-semibold errorColor">{error}</p>}
      </div>
    </div>
  );
}

export default PasswordInput;
