import React, { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ProductEnum, useProductContext } from "../../utils/Product.store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Layout from "../../components/Layout";
import StepHandler from "../../ui/StepHandler";
import { useRouter } from "next/navigation";

export default function Payment() {
  const [value, setValue] = React.useState("");
  const { dispatch, state } = useProductContext();
  const { cart } = state;
  const { paymentMethod } = cart;
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (paymentMethod) {
      setValue(paymentMethod);
    }
  }, [paymentMethod]);

  const handleSubmit = () => {
    if (!value) {
      toast.error("Payment method is not selected", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }
    dispatch({ type: ProductEnum.SAVE_PAYMENT_METHOD, payload: value });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: value,
      })
    );
    router.push("/place_order");
  };

  return (
    <Layout title="Payment method">
      <StepHandler activeStep={2} />
      <div className="flex flex-col mt-6 max-w-screen-sm mx-auto space-y-5">
        <div className="flex flex-col max-w-full bg-white rounded-lg p-6 shadow space-y-5">
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              className="font-semibold text-lg"
            >
              Payment Method
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="payPal"
                control={<Radio />}
                label="PayPal"
              />
              <FormControlLabel
                value="stripe"
                control={<Radio />}
                label="Stripe"
              />
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.back()}
            type="button"
            className="default-btn"
          >
            Back
          </button>
          <button
            className="cart-btn font-semibold h-[45px]"
            type="submit"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}
