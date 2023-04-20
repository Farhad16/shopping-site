import db from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const handler = async (req: any, res: any) => {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;
  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User already exists" });
    await db.disconnect();
    return;
  }

  const newUser = await new User({
    name,
    email,
    password: bcrypt.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();

  res.status(201).send({
    message: "User is created!",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export default handler;
