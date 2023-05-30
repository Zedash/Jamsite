import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios'

export const fetchWrapper = {
  get,
  post,
}

const requestOptions = (token?: string) => {
  const config: AxiosRequestConfig = {
    baseURL: process.env.API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 4000,
  }

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  return config
}

async function get(url: string, token: string) {
  const response = await axios.get(url, requestOptions(token))
  return handleResponse(response)
}

async function post(url: string, body: object, token?: string) {
  const response = await axios.post(url, body, requestOptions(token))
  return handleResponse(response)
}

// Helper function
function handleResponse(response: AxiosResponse<unknown, unknown>) {
  if (response.status < 200 && response.status > 299) {
    const error = response.data
    Sentry.captureException(error)
    return Promise.reject(error)
  }

  return response.data
}
