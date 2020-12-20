export interface Person extends Identible<number> {
  name?: string,
  username?: string,
  email?: string,
  phone?: string
}

export interface Identible<T = string | number> {
  id?: T
}
