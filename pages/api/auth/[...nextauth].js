import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credential) {
        const client = await connectToDatabase();
        const db = client.db();

        const UserModel = db.collection("user");

        const user = await UserModel.findOne({ email: credential.email });

        if (!user) {
          client.close();
          throw new Error("No User Found");
        }

        const isValid = await verifyPassword(
          credential.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in");
        }
        client.close();

        return {
          email: user.email,
        };
      },
    }),
  ],
});
