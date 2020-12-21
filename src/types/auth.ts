export interface RegisterData {
  username: string,
  password: string
}

export interface LoginData {
  username: string,
  password: string,
  rememberMe: boolean
}

export interface AuthState {
  user: User | undefined
}

export interface User {
  id: string | number
  email: string,
  name: string,
  roles: string[]
}

export interface LoginResponse {
  user: User,
  token: string
}

export type RoleChecker = (roles: string | string[]) => boolean
