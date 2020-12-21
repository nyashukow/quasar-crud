export interface Person extends Identible<number> {
  name?: string,
  username?: string,
  email?: string,
  phone?: string
}

export interface User extends Identible<number> {
  email: string,
  name: string,
  roles: string[]
}

export interface Identible<T = string | number> {
  id?: T
}
