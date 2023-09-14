import NextAuth, { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
export const authOptions:NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (!!account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      /// @ts-ignore
      session.accessToken = token.accessToken
      return session
    }
  },
  secret: "my very secret string",
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: '608fc13e3bd647eba6f72859b20bea93',
      clientSecret: '8c8954ab9e0f45d4afa0fd0e33a649f6',
      authorization: {
        params: {
          scope: "user-read-email user-read-playback-state user-modify-playback-state",
        },
      },
    })
  ]
}
export default NextAuth(authOptions)

