import { boot } from 'quasar/wrappers'
import { RoleChecker } from 'src/types'
import { Route } from 'vue-router'
import { Store } from 'vuex'

export default boot<Store<unknown>>(({ router, store }) => {
  router.beforeEach(async (to: RouteWithAuthMeta, from, next) => {
    if (!store.getters['auth/loggedIn']) {
      await store.dispatch('auth/fetch').catch(async () => {
        await store.dispatch('auth/logout')
      })
    }

    const authMeta = to.meta?.auth

    if (!authMeta) {
      return next()
    }

    if (!store.getters['auth/loggedIn']) {
      return next('/')
    }

    if (!isArrayOrString(authMeta)) {
      return next()
    }

    const check = store.getters['auth/check'] as RoleChecker

    if (check && check(authMeta)) {
      return next()
    }

    next('/')
  })
})

function isArrayOrString (variable: any) {
  if (typeof variable === typeof [] || typeof variable === typeof '') {
    return true
  }
  return false
}

interface RouteWithAuthMeta extends Route {
  meta?: {
    auth: AuthMeta
  }
}

type AuthMeta = string | string[] | undefined
