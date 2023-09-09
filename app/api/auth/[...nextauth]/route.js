import User from '@models/user';
import { connectToDatabase } from '@utils/database';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user.email });

    sessionUser.user.id = sessionUser._id.toString();

    return session;
  },
  async signIn({ profile }) {
    try {
      connectToDatabase();
      // check if user exists in database
      const userExists = await User.findOne({ email: profile.email });
      // if not, create user in database
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(' ', '').toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
