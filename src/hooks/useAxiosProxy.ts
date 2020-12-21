import Axios from 'axios'
import { HttpInstance, HttpRequestConfig } from 'src/types'
import { get, set } from 'lodash'

export default function (config: HttpRequestConfig): HttpInstance {
  const axios = Axios.create({ baseURL: config.baseUrl })

  const http: HttpInstance = {
    get: async <R = any> (url = '') => {
      const response = await axios.get<R>(url)
      return response.data
    },
    post: async <T = any, R = any> (url = '', data?: T) => {
      const response = await axios.post<R>(url, data || {})
      return response.data
    },
    put: async <T = any, R = any> (url = '', data?: T) => {
      const response = await axios.put<R>(url, data || {})
      return response.data
    },
    delete: async <R = any> (url = '') => {
      const response = await axios.delete<R>(url)
      return response.data
    },
    setHeader (header: string, value: string | undefined) {
      set(axios, ['defaults', 'headers', 'common', header], value)
    },
    getHeader (header: string) {
      return get(axios, ['defaults', 'headers', 'common', header]) as string | undefined
    }
  }

  return http
}
