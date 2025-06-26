import NextAuth from "next-auth";
import Notion from "next-auth/providers/notion";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Notion({
      clientId: process.env.AUTH_NOTION_ID!,
      clientSecret: process.env.AUTH_NOTION_SECRET!,
      redirectUri: process.env.AUTH_NOTION_REDIRECT_URI!,
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      session.access_token = token.access_token as string;
      return session;
    },
    async redirect({ url }) {
      return url;
    },
  },
});
