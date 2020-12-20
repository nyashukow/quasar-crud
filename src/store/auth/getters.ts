import { AuthState } from 'src/types'

export function user (state: AuthState) {
  return state.user
}

export function loggedIn (state: AuthState) {
  return state.user !== null
}

export const check = (state: AuthState) => (checkedRoles: string | string[]) => {
  const user = state.user

  if (!user) {
    return false
  }

  const userRoles = user.roles

  if (Array.isArray(checkedRoles)) {
    if (checkedRoles.length === 0) {
      return false
    }

    if (!allCheckedRolesIncludesInUserRoles(userRoles, checkedRoles)) {
      return false
    }
  } else {
    if (!userRoles.includes(checkedRoles)) {
      return false
    }
  }

  return true
}

function allCheckedRolesIncludesInUserRoles (userRoles: Array<string>, checkedRoles: Array<string>) {
  for (const role of checkedRoles) {
    if (!userRoles.includes(role)) {
      return false
    }
  }
  return true
}
