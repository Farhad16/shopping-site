import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import StepHandler from "./Stepper";
import { useSession } from "next-auth/react";
import ShippingForm from "./ShippingForm";
import Payment from "../payment/Payment";

function Shipping() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setActiveStep(1);
    }
  }, []);

  const steps: any = {
    1: <ShippingForm setActiveStep={setActiveStep} />,
    2: <Payment setActiveStep={setActiveStep} />,
  };

  return (
    <Layout title="Shipping">
      <StepHandler activeStep={activeStep} setActiveStep={setActiveStep} />
      {Object.keys(steps).map((step) => (
        <div
          key={`shipping-class-step-${step}`}
          style={{
            display:
              activeStep.toString() === step.toString() ? "block" : "none",
          }}
        >
          {steps[step]}
        </div>
      ))}
    </Layout>
  );
}

Shipping.auth = true;
export default Shipping;
