export interface HttpInstance {
  get <R = any> (suffix: string): Promise<R>
  post <T = any, R = any> (suffix: string, data: T): Promise<R>
  put <T = any, R = any> (suffix: string, data: T): Promise<R>
  delete <R = any> (suffix: string): Promise<R>
  setHeader (header: string, value: string | undefined): void
  getHeader (header: string): string | undefined
}

export interface HttpRequestConfig {
  baseUrl?: string,
}
