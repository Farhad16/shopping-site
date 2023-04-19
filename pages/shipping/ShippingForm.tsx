import Cookies from "js-cookie";
import React, { useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import { ProductEnum, useProductContext } from "../../utils/Product.store";
import { useRouter } from "next/navigation";

function ShippingForm() {
  const { dispatch, state } = useProductContext();
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
    },
  });

  useEffect(() => {
    setValue("name", shippingAddress?.name);
    setValue("address", shippingAddress?.address);
    setValue("city", shippingAddress?.city);
    setValue("postalCode", shippingAddress?.postalCode);
    setValue("state", shippingAddress?.state);
    setValue("country", shippingAddress?.country);
  }, [shippingAddress]);

  useEffect(() => {
    if (!shippingAddress) {
      router.push("/shipping");
    }
  }, [shippingAddress]);

  const onSubmit = async (data: any) => {
    dispatch({ type: ProductEnum.SAVE_SHIPPING_ADDRESS, payload: { ...data } });
    Cookies.set(
      "cart",
      JSON.stringify({ ...cart, shippingAddress: { ...data } })
    );
    router.push("/payment");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-screen-sm mx-auto space-y-6"
    >
      <div className="w-full bg-white rounded-lg shadow space-y-5 p-8">
        <h1 className="text-center font-bold text-lg uppercase">
          Shipping Address
        </h1>
        <FormInput
          label="Full name"
          rules={{
            required: { message: "Name is required", value: true },
          }}
          error={errors?.name?.message || ""}
          name="name"
          placeholder="Enter your name"
          type="text"
          control={control}
        />
        <div className="flex sm:flex-row flex-col w-full justify-between gap-4">
          <FormInput
            containerClass="sm:w-1/2 w-full"
            label="Address"
            rules={{
              required: { message: "Address is required", value: true },
            }}
            error={errors?.address?.message || ""}
            name="address"
            placeholder="Enter your address"
            type="text"
            control={control}
          />
          <FormInput
            containerClass="sm:w-1/2 w-full"
            label="City"
            rules={{
              required: { message: "City is required", value: true },
            }}
            error={errors?.city?.message || ""}
            name="city"
            placeholder="Enter your city"
            type="text"
            control={control}
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full justify-between gap-4">
          <FormInput
            containerClass="sm:w-1/2 w-full"
            label="State"
            rules={{
              required: { message: "State is required", value: true },
            }}
            error={errors?.state?.message || ""}
            name="state"
            placeholder="Enter your state"
            type="text"
            control={control}
          />
          <FormInput
            containerClass="sm:w-1/2 w-full"
            label="Postal code"
            rules={{
              required: { message: "Postal Code is required", value: true },
            }}
            error={errors?.postalCode?.message || ""}
            name="postalCode"
            placeholder="Enter your post code"
            type="text"
            control={control}
            controllerClassName="mt-2"
          />
        </div>

        <FormInput
          label="Country"
          rules={{
            required: { message: "Country is required", value: true },
          }}
          error={errors?.country?.message || ""}
          name="country"
          placeholder="Enter your country"
          type="text"
          control={control}
        />
      </div>
      <div className="mb-4 flex justify-end">
        <button className="cart-btn font-semibold h-[45px]" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}

export default memo(ShippingForm);
