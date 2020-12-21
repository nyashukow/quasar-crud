import { boot } from 'quasar/wrappers'
import { Route } from 'vue-router'
import { Store } from 'vuex'
import _ from 'lodash'
import { RoleChecker } from 'src/types'

export default boot<Store<unknown>>(({ router, store }) => {
  router.beforeEach(async (to: RouteWithAuthMeta, from, next) => {
    if (!store.getters['auth/loggedIn']) {
      await store.dispatch('auth/fetch').catch(() => store.dispatch('auth/logout'))
    }

    const roles = _.get(to, ['meta', 'auth', 'roles'], undefined) as AuthRoles

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
  meta?: AuthMeta
}

interface AuthMeta {
  auth?: {
    roles: AuthRoles
  }
}

type AuthRoles = string[] | boolean | undefined
