import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const createAxiosInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 10000,
    responseType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })

  instance.interceptors.response.use(
    response => response,
    error => {
      console.error('Error fetching data:', error)
      return Promise.reject(error)
    }
  )

  return instance
}

export const useAxios = (config: AxiosRequestConfig): AxiosInstance => createAxiosInstance(config)
