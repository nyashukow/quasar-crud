import { UserFetchData, AuthState } from 'src/types'

export default function (): AuthState {
  return {
    user: null,
    loginCallbacks: [],
    convertUserFetchDataToUser: (data: UserFetchData) => {
      return {
        id: data.id,
        email: data.attributes.email,
        name: data.attributes.name,
        roles: data.attributes.roles
      }
    }
  }
}
