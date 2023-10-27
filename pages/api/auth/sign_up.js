import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !email.includes("@") || !name || password.trim().length < 7) {
    res.status(422).json({
      message:
        "Invalid Input - password should also be atleast 7 characters long.",
    });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();

  const hashedPassword = hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "CreatedvUser!" });
}

export default handler;