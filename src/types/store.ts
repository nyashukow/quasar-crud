import { User } from 'src/types'

export interface StoreState {
  auth: AuthState
}

export interface AuthState {
  user: User | undefined
}
