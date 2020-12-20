import { Store } from 'vuex'
import { Ref } from '@vue/composition-api'
import { AuthState, User, LoginData, RegisterData } from 'src/types'

export default function (store: Store<AuthState>): Auth {
  return {
    register: (data) => { return store.dispatch('auth/register', data) },
    login: (data) => { return store.dispatch('auth/login', data) },
    fetch: () => { return store.dispatch('auth/fetch') },
    logout: () => { return store.dispatch('auth/logout') },
    verify: (token) => { return store.dispatch('auth/verify', token) },

    loggedIn: () => { return store.getters['auth/loggedIn'] as Ref<boolean> },
    user: () => { return store.getters['auth/user'] as Ref<User> }
  }
}

export interface Auth {
  register: (data: RegisterData) => Promise<void>
  login: (data: LoginData) => Promise<void>
  fetch: () => Promise<void>
  logout: () => Promise<void>
  verify: (token: string) => Promise<void>

  loggedIn: () => Ref<boolean>
  user: () => Ref<User>
}
