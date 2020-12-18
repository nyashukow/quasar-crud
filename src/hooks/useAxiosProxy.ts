import Axios from 'axios'
import { HttpInstance, HttpRequestConfig } from '../types/models'

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
    }
  }

  return http
}
