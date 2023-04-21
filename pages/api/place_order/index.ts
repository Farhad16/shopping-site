import { getSession } from "next-auth/react";
import db from "../../../utils/db";
import Order from "../../../models/Order";

const handler = async (req: any, res: any) => {
  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).send("You must be logged in");
  }

  await db.connect();

  const order = await Order.findById(req.query.id);
  db.disconnect();
  res.status(201).send(order);
};

export default handler;
