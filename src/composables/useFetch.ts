import { ref, shallowRef, type Ref } from 'vue'
import axios, { type AxiosInstance, AxiosError } from 'axios'

export interface ApiResponse<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  loading: Ref<boolean>
  request: ApiRequest
}

export interface ApiRequest {
  (method: string, endpoint: string, paramsOrData?: Record<string, unknown>): Promise<void>
}

export function useFetch<T>(baseURL: string): ApiResponse<T> {
  const data = shallowRef<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const axiosInstance: AxiosInstance = axios.create({ baseURL })

  const request = async (
    method: string,
    endpoint: string,
    paramsOrData?: Record<string, unknown>
  ) => {
    loading.value = true
    error.value = null

    try {
      const response = await axiosInstance.request<T>({
        method,
        url: endpoint,
        ...(method === 'get' ? { params: paramsOrData } : { data: paramsOrData })
      })

      data.value = response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err.response?.data?.message || 'An error occurred'
      } else {
        error.value = String(err)
      }
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    request
  }
}
