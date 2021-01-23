import { User } from 'src/types'

export interface RegisterData {
  username: string,
  password: string
}

export interface LoginData {
  username: string,
  password: string,
  rememberMe: boolean
}

export interface LoginResponse {
  data: {
    user: User,
    accessToken: string
  }
}

export type RoleChecker = (roles: string | string[]) => boolean
