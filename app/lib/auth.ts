import type { Session, NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"
import { UserRole } from "@/models/User"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { Adapter } from "next-auth/adapters"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || UserRole.USER, // Default to USER role if not set
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Remove console logs to avoid showing errors in the browser console
      
      // If this is the first sign in with credentials
      if (account?.type === 'credentials' && user) {
        token.role = user.role
      } 
      // If this is a sign in with OAuth (Google)
      else if (account?.type === 'oauth' && user) {
        // This is a new OAuth sign in, user object is available
        try {
          const client = await clientPromise
          const db = client.db()
          
          // Check if user exists and update with role and createdAt if needed
          const dbUser = await db.collection('users').findOne({ email: user.email })
          
          if (dbUser) {
            // Set role if not already set
            if (!dbUser.role) {
              await db.collection('users').updateOne(
                { email: user.email },
                { $set: { role: UserRole.USER } }
              )
            }
            
            // Set createdAt if not already set
            if (!dbUser.createdAt) {
              await db.collection('users').updateOne(
                { email: user.email },
                { $set: { createdAt: new Date() } }
              )
            }
            
            // Update token with role from database
            token.role = dbUser.role || UserRole.USER
          }
        } catch {
          // Silently handle error to avoid console errors
        }
      }
      // For subsequent sign-ins where we only have the token
      else if (!token.role) {
        try {
          const client = await clientPromise
          const db = client.db()
          const dbUser = await db.collection('users').findOne({ email: token.email })
          
          if (dbUser) {
            // Set token role from database
            token.role = dbUser.role || UserRole.USER
          } else {
            // Default role if user not found (shouldn't happen)
            token.role = UserRole.USER
          }
        } catch {
          // Silently handle error to avoid console errors
          token.role = UserRole.USER
        }
      }
      
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Remove console logs to avoid showing errors in the browser console
      if (session?.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
}