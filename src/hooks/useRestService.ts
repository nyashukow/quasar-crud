import { Identible } from '../types/models'
import useAxiosProxy from './useAxiosProxy'

export default function <T extends Identible> (config: RestServiceConfig) {
  const http = useAxiosProxy({ baseUrl: config.baseUrl || '' })
  const suffix = config.suffix

  const fetchDocuments = async () => {
    return http.get<T[]>(suffix)
  }

  const fetchDocumentById = async (id: number): Promise<T> => {
    return http.get<T>(`${suffix}/${id}`)
  }

  const createDocument = async (doc: T): Promise<T> => {
    return http.post<T, T>(suffix, doc)
  }

  const updateDocument = async (doc: T): Promise<T> => {
    if (!doc.id) {
      throw new Error('doc.id not defined')
    }
    return http.put<T, T>(`${suffix}/${doc.id}`, doc)
  }

  const removeDocument = async (doc: T): Promise<T> => {
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

export interface RestServiceConfig {
  baseUrl?: string,
  suffix: string
}
