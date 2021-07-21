import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// Server Url
import { SERVER_URL } from '../../../config';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        if (req.method === 'POST') {
          try {
            const response = await fetch(`${SERVER_URL}/api/users/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });

            const user = await response.json();
            if (response.ok && user) {
              return user;
            } else {
              return null;
            }
          } catch (error) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage + '&email=' + credentials.email);
          }
        } else {
          throw new Error({ message: `Method ${req.method} not allowed` });
        }
      },
    }),
  ],
  callback: {
    // Getting the JWT token from API response
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.token;
      }

      return token;
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    error: '/account/login', // Changing the error redirect page to our custom login page
  },
});
