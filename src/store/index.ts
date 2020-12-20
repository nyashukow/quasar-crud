import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      auth
    },
    strict: process.env.NODE_ENV === 'development'
  })

  return Store
}
