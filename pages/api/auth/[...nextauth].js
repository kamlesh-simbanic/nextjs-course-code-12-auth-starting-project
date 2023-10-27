import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { UserModel, client } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credential) {
        const user = await UserModel.findOne({ email: email });

        if (existingUser) {
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
