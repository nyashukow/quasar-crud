import { AuthState } from 'src/types'

export function loggedIn (state: AuthState) {
  return !!state.user
}

export function check (state: AuthState) {
  return (checkedRoles: string[]) => {
    const { user } = state

    if (!user) {
      return false
    }

    const userRole = user.role

    if (!checkedRoles.includes(userRole)) {
      return false
    }

    return true
  }
}
