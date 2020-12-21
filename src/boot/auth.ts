import { boot } from 'quasar/wrappers'
import { RoleChecker } from 'src/types'
import { Route } from 'vue-router'
import { Store } from 'vuex'

export default boot<Store<unknown>>(({ router, store }) => {
  router.beforeEach(async (to: RouteWithAuthMeta, from, next) => {
    if (!store.getters['auth/loggedIn']) {
      await store.dispatch('auth/fetch').catch(() => store.dispatch('auth/logout'))
    }

    const roles = to.meta?.authRoles

    if (!roles) {
      return next()
    }

    if (!store.getters['auth/loggedIn']) {
      return next('/')
    }

    if (!Array.isArray(roles)) {
      return next()
    }

    const check = store.getters['auth/check'] as RoleChecker

    if (check(roles)) {
      return next()
    }

    next('/')
  })
})

interface RouteWithAuthMeta extends Route {
  meta?: {
    authRoles: AuthMeta
  }
}

type AuthMeta = string[] | boolean | undefined
