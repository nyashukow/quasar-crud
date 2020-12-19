import { onBeforeMount, Ref, ref } from '@vue/composition-api'
import { Identible } from 'types/models'

export default function <T extends Identible> (config: CardApiConfig <T>): CardApi<T> {
  const cloneDeep = (doc: T | Readonly<T>): T => {
    return JSON.parse(JSON.stringify(doc)) as T
  }

  const document = ref(cloneDeep(config.defaultDocument)) as Ref<T>

  const callbacks = {
    beforeCreate: [] as ChangeCallback<T>[],
    beforeUpdate: [] as ChangeCallback<T>[],
    beforeRemove: [] as ChangeCallback<T>[]
  }

  const reset = () => {
    document.value = cloneDeep(config.defaultDocument)
  }

  const set = (doc: T) => {
    document.value = cloneDeep(doc)
  }

  const onBeforeCreate = (cb: ChangeCallback<T>) => {
    callbacks.beforeCreate.push(cb)
  }
  const onBeforeUpdate = (cb: ChangeCallback<T>) => {
    callbacks.beforeUpdate.push(cb)
  }
  const onBeforeRemove = (cb: ChangeCallback<T>) => {
    callbacks.beforeRemove.push(cb)
  }
  const callCallbacks = async (callbacks: ChangeCallback<T>[]) => {
    for (let i = 0; i < callbacks.length; i++) {
      document.value = await callbacks[i](document.value)
    }
  }

  const save = async () => {
    if (document.value.id) {
      await callCallbacks(callbacks.beforeUpdate)
    } else {
      await callCallbacks(callbacks.beforeCreate)
    }
  }

  const remove = async () => {
    await callCallbacks(callbacks.beforeRemove)
    reset()
  }

  onBeforeMount(() => {
    reset()
  })

  return {
    document,
    set,
    reset,
    save,
    remove,
    onBeforeCreate,
    onBeforeUpdate,
    onBeforeRemove
  }
}

export interface CardApi <T> {
  document: Ref<T>,
  set (doc: T): void,
  reset (): void,
  save (): Promise<void>,
  remove (): Promise<void>,
  onBeforeCreate (cb: ChangeCallback<T>): void,
  onBeforeUpdate (cb: ChangeCallback<T>): void,
  onBeforeRemove (cb: ChangeCallback<T>): void,
}

export interface CardApiConfig <T> {
  defaultDocument: Readonly<T>
}

export type ChangeCallback <T> = (doc: T) => Promise<T> | T
