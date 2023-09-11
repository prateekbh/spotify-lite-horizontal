import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: '608fc13e3bd647eba6f72859b20bea93',
      clientSecret: '8c8954ab9e0f45d4afa0fd0e33a649f6'
    })
  ]
}
export default NextAuth(authOptions)

