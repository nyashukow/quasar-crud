export interface HttpInstance {
  get <R = any> (suffix: string): Promise<R>
  post <T = any, R = any> (suffix: string, data: T): Promise<R>
  put <T = any, R = any> (suffix: string, data: T): Promise<R>
  delete <R = any> (suffix: string): Promise<R>
  setHeader (header: string, value: string): void
  getHeader (header: string): string
}

export interface HttpRequestConfig {
  baseUrl?: string,
}
