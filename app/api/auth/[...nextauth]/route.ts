import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import prismadb from '@/libs/prismadb';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    Credentials({
        id: "credentials",
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },

        async authorize(credentials) {
            if(!credentials?.email || !credentials?.password) {
                throw new Error("Credentials are required!");
            }

            const user = await prismadb.user.findUnique({
                where: {
                    email: credentials.email
                }
            })

            if(!user || !user.hashedPassword) {
                throw new Error("Email does not existed!")
            }

            const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

            if(!isCorrectPassword) {
                throw new Error("Password is not correct!");
            }

            return user;
        }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  adapter: PrismaAdapter(prismadb),
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }