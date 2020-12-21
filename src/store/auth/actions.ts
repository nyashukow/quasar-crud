import { Cookies } from 'quasar'
import { ActionContext } from 'vuex'
import useAxiosProxy from 'src/hooks/useAxiosProxy'
import { AuthState, LoginData, LoginResponse, RegisterData, StoreState, User } from 'src/types'

const http = useAxiosProxy({ baseUrl: 'http://localhost:3001' })

export function register (ctx: AuthActionContext, data: RegisterData) {
  return http.post<RegisterData, void>('/auth/register', data)
}

export function login (ctx: AuthActionContext, data: LoginData) {
  return http.post<LoginData, LoginResponse>('/auth/login', data)
    .then(async response => {
      const { user, token } = response

      await ctx.dispatch('setUser', user)
      await ctx.dispatch('setHttpHeader', token)

      if (data.rememberMe) {
        await ctx.dispatch('setLongtimeCookies', token)
      } else {
        await ctx.dispatch('setCookies', token)
      }
    })
}

export function setUser (ctx: AuthActionContext, data: User | undefined) {
  ctx.commit('setUser', data)
}

export function setHttpHeader (ctx: AuthActionContext, token: string) {
  http.setHeader('Authorization', `Bearer ${token}`)
}

export function setCookies (ctx: AuthActionContext, token: string) {
  Cookies.set('authorization_token', token)
}

export function setLongtimeCookies (ctx: AuthActionContext, token: string) {
  Cookies.set('authorization_token', token, { expires: 365 })
}

export async function fetch (ctx: AuthActionContext) {
  const token = Cookies.get('authorization_token')

  if (token) {
    await ctx.dispatch('setHttpHeader', token)
  } else {
    throw new Error('No authorization token found')
  }

  return http.get<User>('/auth/me').then(response => ctx.dispatch('setUser', response))
}

export function logout (ctx: AuthActionContext) {
  Cookies.remove('authorization_token')
  http.setHeader('Authorization', undefined)
  return ctx.dispatch('setUser')
}

type AuthActionContext = ActionContext<AuthState, StoreState>
