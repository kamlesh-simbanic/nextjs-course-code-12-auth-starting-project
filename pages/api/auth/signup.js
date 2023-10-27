import { hashPassword } from "../../../lib/auth";
import { UserModel, client, connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid Input - password should also be atleast 7 characters long.",
    });
    return;
  }
  console.log("email", email);
  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await UserModel.insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created User!" });
  client.close();
}

export default handler;
