import { getSession } from "next-auth/react";
import db from "../../../utils/db";
import Order from "../../../models/Order";

const handler = async (req: any, res: any) => {
  const session = await getSession({ req });

  const user = session?.user;

  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user?._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
};

export default handler;
