// import NextAuth from "next-auth/next"
// import type { DefaultSession, NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "@/lib/mongodb"
// import bcrypt from "bcryptjs"
// import { JWT } from "next-auth/jwt"
// import { Adapter } from "next-auth/adapters"

// export const runtime = 'nodejs'

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid credentials');
//         }

//         const client = await clientPromise;
//         const db = client.db();
//         const user = await db.collection('users').findOne({ email: credentials.email });

//         if (!user || !user?.password) {
//           throw new Error('Invalid credentials');
//         }

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isCorrectPassword) {
//           throw new Error('Invalid credentials');
//         }

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt" as const,
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async session({ session, token }: { session: DefaultSession; token: JWT }) {
//       if (session.user) {
//         (session.user as { id: string | undefined }).id = token.sub;
//       }
//       return session;
//     },
//   },
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }


import NextAuth from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const runtime = 'nodejs'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }