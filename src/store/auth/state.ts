import { AuthState } from 'src/types'

export default function (): AuthState {
  return {
    user: undefined,
    token: ''
  }
}
