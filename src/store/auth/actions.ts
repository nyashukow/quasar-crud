import { Cookies } from 'quasar'
import { ActionContext } from 'vuex'
import Axios from 'axios'
import set from 'lodash/set'
import { AuthState, LoginData, LoginResponse, RegisterData, StoreState, User } from 'src/types'

const http = Axios.create({ baseURL: 'http://localhost:3000' })

export function register (ctx: AuthActionContext, data: RegisterData) {
  return http.post<RegisterData, void>('/auth/registration', data)
}

export function login (ctx: AuthActionContext, loginData: LoginData) {
  return http.post<LoginData, LoginResponse>('/auth/login', loginData)
    .then(async response => {
      const { data } = response
      const { user, accessToken } = data

      await ctx.dispatch('setUser', user)
      await ctx.dispatch('setToken', accessToken)
      await ctx.dispatch('setHttpHeader', accessToken)

      if (loginData.rememberMe) {
        await ctx.dispatch('setLongtimeCookies', accessToken)
      } else {
        await ctx.dispatch('setCookies', accessToken)
      }
    })
}

export function setUser (ctx: AuthActionContext, data: User | undefined) {
  ctx.commit('setUser', data)
}

export function setToken (ctx: AuthActionContext, data: string) {
  ctx.commit('setToken', data)
}

export function setHttpHeader (ctx: AuthActionContext, token: string) {
  set(http.defaults.headers, ['common', 'Authorization'], `Bearer ${token}`)
}

export function setCookies (ctx: AuthActionContext, token: string) {
  Cookies.set('authorization_token', token)
}

export function setLongtimeCookies (ctx: AuthActionContext, token: string) {
  Cookies.set('authorization_token', token, { expires: 365 })
}

export async function fetch (ctx: AuthActionContext) {
  const token = Cookies.get('authorization_token')
  console.log('token', token)
  if (token) {
    await ctx.dispatch('setHttpHeader', token)
  } else {
    throw new Error('No authorization token found')
  }

  return http.get<User>('/auth/me').then(response => ctx.dispatch('setUser', response.data))
}

export function logout (ctx: AuthActionContext) {
  Cookies.remove('authorization_token')
  set(http.defaults.headers, ['common', 'Authorization'], undefined)
  return ctx.dispatch('setUser')
}

type AuthActionContext = ActionContext<AuthState, StoreState>
