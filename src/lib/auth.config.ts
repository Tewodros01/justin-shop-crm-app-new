import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const validUser = {
          id: '1',
          name: 'Senape',
          email: 'senape@sincro.it',
          password: '123456' // You should hash passwords in a real app!
        };

        if (
          credentials?.email === validUser.email &&
          credentials?.password === validUser.password
        ) {
          return {
            id: validUser.id,
            name: validUser.name,
            email: validUser.email
          };
        } else {
          throw new Error('Invalid credentials');
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id as string; // Explicitly cast `id` as a string
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session?.user) {
        session.user.id = token.id as string; // Explicitly cast `id` as a string
      }
      return session;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
