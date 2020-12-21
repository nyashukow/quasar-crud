import { Identible } from 'src/types'
import useAxiosProxy from 'src/hooks/useAxiosProxy'

const dev = process.env.NODE_ENV === 'development'

export default function <T extends Identible> (config: RestServiceConfig): RestService<T> {
  const http = useAxiosProxy({ baseUrl: config.baseUrl || '' })
  const { endpoint } = config

  const fetchDocuments = async () => {
    return http.get<T[]>(endpoint)
      .catch((err) => {
        dev && console.error(err)
        return []
      })
  }

  const fetchDocumentById = async (id: number) => {
    return http.get<T>(`${endpoint}/${id}`)
      .catch((err) => {
        dev && console.error(err)
        return undefined
      })
  }

  const createDocument = async (doc: T) => {
    return http.post<T, T>(endpoint, doc)
      .catch((err) => {
        dev && console.error(err)
        return undefined
      })
  }

  const updateDocument = async (doc: T) => {
    if (!doc.id) {
      throw new Error('doc.id not defined')
    }
    return http.put<T, T>(`${endpoint}/${doc.id}`, doc)
      .catch((err) => {
        dev && console.error(err)
        return undefined
      })
  }

  const removeDocument = async (doc: T) => {
    if (!doc.id) {
      throw new Error('doc.id not defined')
    }
    return http.delete<T>(`${endpoint}/${doc.id}`)
      .then(() => doc)
      .catch((err) => {
        dev && console.error(err)
        return undefined
      })
  }

  return {
    fetchDocuments,
    fetchDocumentById,
    createDocument,
    updateDocument,
    removeDocument
  }
}

export interface RestService <T> {
  fetchDocuments: () => Promise<T[]>,
  fetchDocumentById: (id: number) => Promise<T | undefined>,
  createDocument: (doc: T) => Promise<T | undefined>,
  updateDocument: (doc: T) => Promise<T | undefined>,
  removeDocument: (doc: T) => Promise<T | undefined>
}

export interface RestServiceConfig {
  baseUrl?: string,
  endpoint: string
}
