import { Identible } from '../types/models'
import useAxiosProxy from './useAxiosProxy'

export default function <T extends Identible> (config: RestServiceConfig): RestService<T> {
  const http = useAxiosProxy({ baseUrl: config.baseUrl || '' })
  const suffix = config.suffix

  const fetchDocuments = async () => {
    return http.get<T[]>(suffix)
  }

  const fetchDocumentById = async (id: number) => {
    return http.get<T>(`${suffix}/${id}`)
  }

  const createDocument = async (doc: T) => {
    return http.post<T, T>(suffix, doc)
  }

  const updateDocument = async (doc: T) => {
    if (!doc.id) {
      throw new Error('doc.id not defined')
    }
    return http.put<T, T>(`${suffix}/${doc.id}`, doc)
  }

  const removeDocument = async (doc: T) => {
    if (!doc.id) {
      throw new Error('doc.id not defined')
    }
    return http.delete<T>(`${suffix}/${doc.id}`)
      .then(() => doc)
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
  fetchDocumentById: (id: number) => Promise<T>,
  createDocument: (doc: T) => Promise<T>,
  updateDocument: (doc: T) => Promise<T>,
  removeDocument: (doc: T) => Promise<T>
}

export interface RestServiceConfig {
  baseUrl?: string,
  suffix: string
}
