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

    const userRoles = user.roles

    if (!checkedRoles.length) {
      return false
    }

    if (checkedRoles.some(role => !userRoles.includes(role))) {
      return false
    }

    return true
  }
}
