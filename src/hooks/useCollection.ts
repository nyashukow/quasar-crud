import { onBeforeMount, ref, Ref } from '@vue/composition-api'
import { Identible } from 'types/models'
import { RestService } from './useRestService'

export default function <T extends Identible> (config: TableApiConfig<T>): TableApi<T> {
  const rest = config.restService
  const documents = ref<T[]>([])

  const pushDocument = async (doc: T) => {
    const newDoc = await rest.createDocument(doc)

    if (!newDoc) {
      throw new Error('Document not created')
    }

    documents.value = documents.value.concat(newDoc)
    return newDoc
  }

  const replaceDocument = async (doc: T) => {
    const newDoc = await rest.updateDocument(doc)

    if (!newDoc) {
      throw new Error('Document not updated')
    }

    documents.value = documents.value.map(d => d.id === newDoc.id ? newDoc : d)
    return newDoc
  }

  const removeDocument = async (doc: T) => {
    const removedDoc = await rest.removeDocument(doc)

    if (!removedDoc) {
      throw new Error('Document not removed')
    }

    documents.value = documents.value.filter(d => d.id !== removedDoc.id)
    return removedDoc
  }

  onBeforeMount(async () => {
    documents.value = await rest.fetchDocuments()
  })

  return {
    documents,
    pushDocument,
    replaceDocument,
    removeDocument
  }
}

export interface TableApi <T> {
  documents: Ref<T[]>,
  pushDocument: (doc: T) => Promise<T>,
  replaceDocument: (doc: T) => Promise<T>,
  removeDocument: (doc: T) => Promise<T>
}

export interface TableApiConfig <T> {
  restService: RestService<T>
}
