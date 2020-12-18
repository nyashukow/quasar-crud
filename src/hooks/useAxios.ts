import { inject } from '@vue/composition-api'
import { AxiosInstance } from 'axios'

export default function (): AxiosInstance {
  const axios: AxiosInstance | undefined = inject('axios')
  if (!axios) {
    throw new Error('axios not provided')
  }

  return axios
}
