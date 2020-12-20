import { AuthState, LoginCallback, UserConverter, UserFetchData } from 'src/types'

export function setUser (state: AuthState, data: UserFetchData | undefined) {
  if (data) {
    state.user = state.convertUserFetchDataToUser(data)
  } else {
    state.user = null
  }
}

export function addLoginCallback (state: AuthState, data: LoginCallback) {
  state.loginCallbacks.push(data)
}

export function setUserData (state: AuthState, data: UserConverter) {
  state.convertUserFetchDataToUser = data
}
