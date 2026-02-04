import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/db';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { profile: true },
          });
          if (!user?.passwordHash) {
            throw new Error('USER_NOT_FOUND');
          }
          const ok = await compare(credentials.password, user.passwordHash);
          if (!ok) {
            throw new Error('INVALID_PASSWORD');
          }
          return {
            id: user.id,
            email: user.email,
            name: user.name ?? undefined,
            image: user.image ?? undefined,
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'UNEXPECTED_ERROR';
          if (message === 'USER_NOT_FOUND' || message === 'INVALID_PASSWORD') {
            throw new Error(message);
          }
          await prisma.authErrorLog.create({
            data: {
              email: credentials?.email ?? null,
              message,
              stack: error instanceof Error ? error.stack ?? null : null,
              context: { source: 'nextauth-authorize' },
            },
          });
          throw new Error('UNEXPECTED_ERROR');
        }
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

declare module 'next-auth' {
  interface Session {
    user: { id: string; email?: string | null; name?: string | null; image?: string | null };
  }
}
