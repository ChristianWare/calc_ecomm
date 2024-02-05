import CredentialsProvider from "next-auth/providers/credentials";
import { SignInCredentials } from "./app/types";
import NextAuth from "next-auth/next";

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, request) {
        const { email, password } = credentials as SignInCredentials;

        //send request to your api route where you can sign in as user and send error or success response to this function.

        const { user, error } = await fetch(
          "http://localhost:3000/api/users/signin",
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
          }
        ).then(async (res) => await res.json());

        if (error) throw new Error(error);

        return { id: user.id };
      },
    }),
  ],
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
