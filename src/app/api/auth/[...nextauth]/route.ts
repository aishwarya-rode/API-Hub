import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user, account }) {
      return token
    },
  },
})

export { handler as GET, handler as POST } 