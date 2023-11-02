import { getSession } from "next-auth/react";
import { client } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  console.log("req", req);

  const session = await getSession({ req });

  console.log("session", session);
  if (!session) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const db = client.db();

  const UserModel = db.collection("user");

  const user = await UserModel.findOne({ email: userEmail });

  if (!user) {
    client.close();
    res.status(404).json({ message: "No User Found" });
    return;
  }

  const passwordsAreEqual = await verifyPassword(oldPassword, user.password);
  if (!passwordsAreEqual) {
    client.close();
    res.status(403).json({ message: "Invalid Password." });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await UserModel.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(403).json({ message: "Password Updated!" });
}

export default handler;
