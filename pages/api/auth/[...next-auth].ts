import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

import connectDb from 'models'
import { IUser } from 'components/helpers/types'

connectDb()

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null
        if (!credentials.username || !credentials.password) return null
        if (
          credentials.username === process.env.ADMIN_USERNAME &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: 'admin' }
        } else return null
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user._id
        token.sub = JSON.stringify({ id: user._id })
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.user = JSON.parse(token.sub ?? '') as IUser
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/auth',
  },
})
