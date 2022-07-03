import NextAuth, { DefaultSession } from 'next-auth'

import { IUser } from 'components/helpers/types'

declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user']
  }
}
