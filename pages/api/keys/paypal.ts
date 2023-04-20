import { getSession } from "next-auth/react";

const handler = async (req: any, res: any) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("You must be logged in");
  }
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
};
export default handler;
