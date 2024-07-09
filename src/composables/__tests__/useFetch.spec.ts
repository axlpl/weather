import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useFetch } from '@/composables/useFetch'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('axios')

describe('useFetch', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    const mockAxiosInstance = {
      request: vi.fn(),
      interceptors: {
        response: {
          use: vi.fn()
        }
      }
    }

    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance)
  })

  it('fetches data successfully', async () => {
    const responseData = { message: 'success' }
    const { data, error, loading, request } = useFetch('https://api.example.com')
    vi.mocked(axios.create().request).mockResolvedValue({ data: responseData })

    await request('get', '/endpoint')

    expect(data.value).toEqual(responseData)
    expect(error.value).toBeNull()
    expect(loading.value).toBe(false)
  })

  it('handles fetch error', async () => {
    const errorMessage = 'Network Error'
    const { data, error, loading, request } = useFetch('https://api.example.com')
    vi.mocked(axios.create().request).mockRejectedValue(new Error(errorMessage))

    await request('get', '/endpoint')

    expect(data.value).toBeNull()
    expect(error.value).toContain(errorMessage)
    expect(loading.value).toBe(false)
  })
})
