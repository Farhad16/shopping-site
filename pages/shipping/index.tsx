import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import StepHandler from "./Stepper";
import { useSession } from "next-auth/react";
import ShippingForm from "./ShippingForm";

function Shipping() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setActiveStep(1);
    }
  }, []);
  return (
    <Layout title="Shipping">
      <StepHandler activeStep={activeStep} />
      <ShippingForm />
    </Layout>
  );
}

Shipping.auth = true;
export default Shipping;
