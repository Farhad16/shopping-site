import Product from "../../models/Product";
import db from "../../utils/db";
import { data } from "../../utils/staticData";

const handler = async (req: any, res: any) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "user added successfully" });
};

export default handler;
