import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import Layout from "../../components/Layout";

function Auth({ children }: any) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized");
    },
  });

  if (status === "loading") {
    return (
      <Layout>
        <CircularProgress className="absolute top-[50%] left-[50%]" />;
      </Layout>
    );
  }
  return children;
}

export default Auth;
