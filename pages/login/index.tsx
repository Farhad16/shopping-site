import React from "react";
import Layout from "../../components/Layout";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import ErrorIcon from "@mui/icons-material/Error";

function Login() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => console.log(data);

  return (
    <Layout title="Login">
      <form
        className="max-w-screen-sm mx-auto bg-white rounded-lg p-6 shadow space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center font-bold text-lg uppercase">Login</h1>
        <div>
          <span className="font-semibold">Your email *</span>
          <div className="mt-2 text-black">
            <Controller
              name="email"
              control={control}
              rules={{
                required: { message: "Email required", value: true },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter your email"
                  fullWidth
                  size="small"
                  color="primary"
                  type="email"
                  autoFocus
                  inputProps={{
                    className: "text-sm py-3 text-black",
                  }}
                />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors?.email?.message}</p>
            )}
          </div>
        </div>
        <div>
          <span className="font-semibold">Your Password *</span>
          <div className="mt-2">
            <Controller
              name="password"
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
                  placeholder="Enter your password"
                  fullWidth
                  size="small"
                  type={showPassword ? "text" : "password"}
                  color="primary"
                  inputProps={{
                    className: "text-sm py-3",
                  }}
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
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors?.password?.message}
              </p>
            )}
          </div>
        </div>
        <button className="cart-btn font-semibold h-[45px]" type="submit">
          Submit
        </button>
        <div className="flex justify-between text-[14px] flex-row items-center">
          <Link href="/forgot-password">Forgot password?</Link>
          <p>
            Don't have an account?
            <Link href="/register" className="font-semibold ml-2 underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </Layout>
  );
}

export default Login;
