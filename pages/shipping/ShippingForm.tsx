import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import { ProductEnum, useProductContext } from "../../utils/Product.store";

function ShippingForm({ setActiveStep }: any) {
  const { dispatch, state } = useProductContext();
  const { cart } = state;
  const { shippingAddress } = cart;

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
  }, [setValue, shippingAddress]);

  const onSubmit = async (data: any) => {
    dispatch({ type: ProductEnum.SAVE_SHIPPING_ADDRESS, payload: { ...data } });
    Cookies.set(
      "cart",
      JSON.stringify({ ...cart, shippingAddress: { ...data } })
    );
    setActiveStep((prev: any) => {
      return prev + 1;
    });
  };

  return (
    <form
      className="mt-6 max-w-screen-sm mx-auto bg-white rounded-lg p-6 shadow space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <button className="cart-btn font-semibold h-[45px]" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ShippingForm;
