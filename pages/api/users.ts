import User from "../../models/User";
import db from "../../utls/db";
import { data } from "../../utls/staticData";

const handler = async (req: any, res: any) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: "user added successfully" });
};

export default handler;
