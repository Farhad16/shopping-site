import Order from "../../../models/Order";
import db from "../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req: any, res: any) => {
  const session = await getSession({ req });

  await db.connect();
  const orders = await Order.find({ user: session?.user?._id });
  await db.disconnect();
  res.send(orders);
};

export default handler;
