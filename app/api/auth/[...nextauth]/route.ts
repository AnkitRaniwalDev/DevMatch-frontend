import NextAuth from "next-auth"; // NextAuth ko import kiya hai taki hum apne authentication ke liye next-auth ka use kar sake.
import GoogleProvider from "next-auth/providers/google";  // GoogleProvider ko import kiya hai taki hum apne app me google authentication ka use kar sake, aur users apne google account se login kar sake.

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };