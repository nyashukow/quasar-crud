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
  user: User | null,
  loginCallbacks: Array<LoginCallback>,
  convertUserFetchDataToUser: UserConverter
}

export type UserConverter = (data: UserFetchData) => User

export type LoginCallback = () => void

export interface UserFetchData {
  id: string | number,
  attributes: {
    email: string,
    name: string,
    roles: string[]
  }
}

export interface User {
  id: string | number
  email: string,
  name: string,
  roles: string[]
}

export type RoleChecker = (roles: string | string[]) => boolean
