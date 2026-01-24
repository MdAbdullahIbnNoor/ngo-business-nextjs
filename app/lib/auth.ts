import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL!;
        const adminPassword = process.env.ADMIN_PASSWORD!; // use plain password for testing

        if (!credentials?.email || !credentials?.password) return null;

        // Direct string comparison
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return { id: "admin", name: "Admin", email: adminEmail };
        }

        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/signin' },
};