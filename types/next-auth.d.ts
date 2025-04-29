import type { DefaultSession } from 'next-auth'

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name: string
    image?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name: string
    picture?: string
    sub?: string
  }
}
