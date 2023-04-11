import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";

function Auth({ children }: any) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized");
    },
  });

  if (status === "loading") {
    return <CircularProgress />;
  }
  return children;
}

export default Auth;
