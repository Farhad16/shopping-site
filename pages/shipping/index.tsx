import React, { useEffect, memo } from "react";
import Layout from "../../components/Layout";
import StepHandler from "../../ui/StepHandler";
import { useSession } from "next-auth/react";
import ShippingForm from "./ShippingForm";
import { useRouter } from "next/navigation";
function Shipping() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/login");
    }
  }, [session?.user]);

  return (
    <Layout title="Shipping">
      <StepHandler activeStep={1} />
      <ShippingForm />
    </Layout>
  );
}

Shipping.auth = true;
export default memo(Shipping);
