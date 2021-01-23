export class Card {
  _id?: string
  name = ''

  constructor (data: Partial<Card> = {}) {
    Object.assign(this, data)
  }
}

export interface User extends Identible<string> {
  username: string,
  role: string
}

export interface Identible<T = string | number> {
  id?: T
}
