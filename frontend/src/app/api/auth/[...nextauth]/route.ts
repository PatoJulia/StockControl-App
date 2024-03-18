import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const whitelist = process.env.WHITELIST || [""];
      const isAllowedToSignin = whitelist.includes(user.email!);
      if (isAllowedToSignin) {
        return true;
      } else {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
