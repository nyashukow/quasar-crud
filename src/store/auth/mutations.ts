import { AuthState, User } from 'src/types'

export function setUser (state: AuthState, data: User | undefined) {
  state.user = data
}

export function setToken (state: AuthState, data: string) {
  state.token = data
}
