import { Store } from 'vuex'
import { computed, ComputedRef } from '@vue/composition-api'
import { User, LoginData, RegisterData, StoreState } from 'src/types'

export default function (store: Store<StoreState>): Auth {
  return {
    register: (data) => store.dispatch('auth/register', data),
    login: (data) => store.dispatch('auth/login', data),
    fetch: () => store.dispatch('auth/fetch'),
    logout: () => store.dispatch('auth/logout'),

    loggedIn: () => store.getters['auth/loggedIn'] as ComputedRef<boolean>,
    user: () => computed(() => store.state.auth.user)
  }
}

export interface Auth {
  register: (data: RegisterData) => Promise<void>
  login: (data: LoginData) => Promise<void>
  fetch: () => Promise<void>
  logout: () => Promise<void>

  loggedIn: () => ComputedRef<boolean>
  user: () => ComputedRef<User | undefined>
}
