export interface User extends Identible<number> {
  name?: string,
  username?: string,
  email?: string,
  phone?: string
}

export interface Identible<T = string | number> {
  id?: T
}

export interface HttpInstance {
  get <R = any> (suffix: string): Promise<R>
  post <T = any, R = any> (suffix: string, data: T): Promise<R>
  put <T = any, R = any> (suffix: string, data: T): Promise<R>
  delete <R = any> (suffix: string): Promise<R>
}

export interface HttpRequestConfig {
  baseUrl?: string,
}
