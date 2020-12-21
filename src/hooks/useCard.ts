import { onBeforeMount, Ref, ref } from '@vue/composition-api'
import { Identible } from 'src/types'
import { cloneDeep } from 'src/shared/utils'

export default function <T extends Identible> (config: CardApiConfig<T>): CardApi<T> {
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

  const onBeforeCreate = callbacks.beforeCreate.push
  const onBeforeUpdate = callbacks.beforeUpdate.push
  const onBeforeRemove = callbacks.beforeRemove.push

  const callCallbacks = async (callbacks: ChangeCallback<T>[]) => {
    for (const callback of callbacks) {
      document.value = await callback(document.value)
    }
  }

  const save = async () => {
    const { id } = document.value

    const neededCallbacks = id ? callbacks.beforeUpdate : callbacks.beforeCreate

    await callCallbacks(neededCallbacks)
  }

  const remove = () => callCallbacks(callbacks.beforeRemove)
    .then(() => reset())

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

export interface CardApi<T> {
  document: Ref<T>,
  set (doc: T): void,
  reset (): void,
  save (): Promise<void>,
  remove (): Promise<void>,
  onBeforeCreate (cb: ChangeCallback<T>): void,
  onBeforeUpdate (cb: ChangeCallback<T>): void,
  onBeforeRemove (cb: ChangeCallback<T>): void,
}

export interface CardApiConfig<T> {
  defaultDocument: Readonly<T>
}

export type ChangeCallback<T> = (doc: T) => Promise<T> | T
