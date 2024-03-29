import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import PasswordInput from "../../ui/PasswordInput";
import FormInput from "../../ui/FormInput";

function Login() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, redirect, session]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        toast.error(result.error);
      }
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      } else toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {session?.user ? (
        <Layout title={redirect}>
          <CircularProgress className="absolute top-[50%] right-[50%]" />
        </Layout>
      ) : (
        <Layout title="Login">
          <form
            className="w-full md:max-w-screen-sm mx-auto bg-white rounded-lg p-6 shadow space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-center font-bold text-lg uppercase">Login</h1>
            <FormInput
              label="Your Email *"
              control={control}
              inputClassName="text-sm py-3"
              error={errors?.email?.message || ""}
              controllerClassName="text-black"
              rules={{
                required: { message: "Email required", value: true },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              }}
              name="email"
              placeholder="Enter your email email"
              type="email"
            />

            <PasswordInput
              label="Your Password *"
              control={control}
              inputClassName="text-sm py-3 text-black"
              error={errors?.password?.message}
              name="password"
              placeholder="Enter your password"
            />
            <button
              className="cart-btn font-semibold h-[45px] w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={25} className="text-white" />
              ) : (
                "Submit"
              )}
            </button>
            <div className="flex justify-between text-[14px] flex-row items-center">
              <Link href="/forgot-password">Forgot password?</Link>
              <p>
                Don&apos;t have an account?
                <Link
                  href={`/register?redirect=${redirect || "/"}`}
                  className="font-semibold ml-2 underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </Layout>
      )}
    </>
  );
}

export default Login;
