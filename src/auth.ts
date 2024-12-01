// Import necessary modules and types
import type {User} from '@/app/lib/definitions';
// import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client'; // Correct import
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {authConfig} from './auth.config';
import {z} from 'zod';

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Updated getUser function using Prisma's findUnique
async function getUser(email: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {email},
        });
        // create a user object from the returned data
        // check if the user is null or not
        if (!user) return null;
        else {
            // create a user object from the returned data
            return {
                id: user.id,
                name: user.name!,
                email: user.email!,
                emailVerified: user.emailVerified!,
                image: user.image!,
                password: user.password!,
            };
        }
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

// Export NextAuth configuration
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          // TODO enable bcrypt check
          // const passwordsMatch = await bcrypt.compare(password, user.password);
          const passwordsMatch = (password === user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
