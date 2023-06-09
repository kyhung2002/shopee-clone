import axios, { AxiosInstance, AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, saveAccessTokenToLS, saveProfile } from './auth'
import { AuthResponse } from 'src/types/auth.type'
class Http {
  instance: AxiosInstance
  access_token: string
  constructor() {
    this.access_token = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.Authorization = this.access_token
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === 'login' || url === 'register') {
          const data = response.data as AuthResponse
          this.access_token = data.data.access_token
          saveAccessTokenToLS(this.access_token)
          saveProfile(data.data.user)
        } else if (url === 'logout') {
          this.access_token = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
