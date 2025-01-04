import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { userService } from "@/services/userService"

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
    async signIn({ user }) {
      try {
        // Check if user exists in Supabase
        const existingUser = await userService.getUserByEmail(user.email!)
        
        // If user doesn't exist, create them
        if (!existingUser) {
          await userService.createUser({
            email: user.email!,
            name: user.name || null,
            image: user.image || null,
          })
        }
        
        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return true // Still allow sign in even if Supabase storage fails
      }
    },
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user, account }) {
      return token
    },
  },
})

export { handler as GET, handler as POST } 