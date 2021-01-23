import * as _ from 'lodash'

export function cloneDeep<T> (obj: T | Readonly<T>): T {
  return _.cloneDeep(obj) as T
}
