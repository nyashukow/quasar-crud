import useAxiosProxy from '../../hooks/useAxiosProxy'
import { Cookies } from 'quasar'
import { AuthState, LoginData, RegisterData, UserFetchData } from 'src/types'
import { ActionContext } from 'vuex'

const http = useAxiosProxy({ baseUrl: 'http://localhost:3001' })

export function register (ctx: AuthActionContext, data: RegisterData) {
  return http.post<RegisterData, void>('/auth/register', data)
}

export function login (ctx: AuthActionContext, data: LoginData) {
  return http.post<LoginData, { user: UserFetchData, token: string }>('/auth/login', data)
    .then(async response => {
      ctx.commit('setUser', response.user)

      const token = response.token
      await ctx.dispatch('setAuthHeader', token)
      const cookiesData = { token: token, rememberMe: data.rememberMe } as CookiesData
      await ctx.dispatch('setCookies', cookiesData)
    })
}

export function setAuthHeader (ctx: AuthActionContext, token: string) {
  http.setHeader('Authorization', `Bearer ${token}`)
}

export function setCookies (state: AuthActionContext, data: CookiesData) {
  if (data.rememberMe) {
    Cookies.set('authorization_token', data.token, {
      expires: 365
    })
  } else {
    Cookies.set('authorization_token', data.token)
  }
}

export async function fetch (ctx: AuthActionContext) {
  const token = Cookies.get('authorization_token')

  if (token) {
    await ctx.dispatch('setAuthHeader', token)
  }

  if (!http.getHeader('Authorization')) {
    throw new Error('No authorization token found')
  }

  return http.get<UserFetchData>('/auth/me').then(response => {
    ctx.commit('setUser', response)
  }).then(async () => {
    await ctx.dispatch('loginCallback')
  })
}

export function logout (ctx: AuthActionContext) {
  Cookies.remove('authorization_token')
  ctx.commit('setUser', null)
}

export function verify (ctx: AuthActionContext, token: string) {
  return http.get<boolean>(`/auth/verify?token=${token}`)
}

export function loginCallback (ctx: AuthActionContext) {
  ctx.state.loginCallbacks.forEach(cb => cb())
}

type AuthActionContext = ActionContext<AuthState, AuthState>

interface CookiesData {
  token: string,
  rememberMe: boolean
}
