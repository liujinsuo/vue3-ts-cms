import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './type'

import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { ElLoading } from 'element-plus'

const DEAFULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    //实例中config传过来的拦截器，对应的是实例的拦截器
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //所有实例的拦截器，也就是全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都拦截 请求成功拦截')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        // console.log('所有实例都拦截 请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都拦截 响应成功拦截')

        this.loading?.close()
        const data = res.data
        return data
      },
      (err) => {
        // console.log('所有实例都拦截 响应失败拦截')
        this.loading?.close()
        return err
      }
    )
  }
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default HYRequest
