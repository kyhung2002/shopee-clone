import { User } from './user.type'
import { SuccessAPI } from './utils.type'

export type AuthResponse = SuccessAPI<{
  access_token: string
  expires: string
  user: User
}>
