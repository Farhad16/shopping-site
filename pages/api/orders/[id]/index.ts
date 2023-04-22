import db from "../../../../utils/db";
import Order from "../../../../models/Order";

const handler = async (req: any, res: any) => {

  await db.connect();

  const order = await Order.findById(req.query.id);
  db.disconnect();
  res.status(201).send(order);
};

export default handler;
