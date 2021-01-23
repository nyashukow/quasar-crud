export interface User extends Identible<string> {
  username: string,
  role: string
}

export interface Identible<T = string | number> {
  id?: T
}
