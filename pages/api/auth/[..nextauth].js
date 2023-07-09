import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { connectToDataBase, findDocument } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      authorize: async (credentials) => {
        const client = connectToDataBase();
        const user = findDocument(client, 'user', { email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();

        return { email: user.email };

      }
    })
  ]
});