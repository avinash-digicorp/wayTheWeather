import {omit} from 'lodash'
import axios from 'axios'
import {hasTextLength, hasValue} from 'utils/condition'
import {routes} from '@/navigation'
import {navigateTo, resetNavigation} from '@/navigation/navigation-action'
import env from 'config/config-api'
import {store as reduxStore, RootState} from 'store'
import NetInfo from '@react-native-community/netinfo'
import {logout} from 'store/auth/slice'

type IProps = {
  path: string
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  header?: Object
  data?: Object
  axiosProps?: any
  image: any
}

export type IParamsProps = {
  page?: number
  limit?: number
  search?: string
  sort?: string
  filter?: string
}

export type responseType = {
  data: any
  status: number
}

export default class Request {
  static get(path, options = {}) {
    return this.request({method: 'GET', path, ...options})
  }

  static post(path, data, options = {}) {
    return this.request({method: 'POST', path, data, ...options})
  }

  static put(path, data, options = {}) {
    return this.request({method: 'PUT', path, data, ...options})
  }

  static delete(path, data, options = {}) {
    return this.request({method: 'DELETE', path, data, ...options})
  }

  static createFormData = props => {
    const {
      data,
      withFormData,
      withFile = false,
      fileName = '',
      prepend = ''
    } = props
    if (!withFormData) {
      return JSON.stringify(data)
    }

    const formData = new FormData()
    if (!hasValue(data)) {
      return formData
    }

    if (withFile) {
      const files = Object.keys(data?.[fileName]).map(
        key => data?.[fileName][key]
      )

      if (files) {
        files.forEach(file => {
          const image = {uri: file.uri, type: file.type, name: file.fileName}
          formData.append(`${fileName}${prepend}`, image)
        })
      }
      const remainData = omit(data, [fileName])
      for (const key in data) {
        remainData.hasOwnProperty(key) && formData.append(key, data[key])
      }
      return formData
    }

    for (const key in data) {
      data.hasOwnProperty(key) && formData.append(key, data[key])
    }
    return formData
  }

  static createImageFormData = props => {
    const {data, image} = props
    const formData = new FormData()

    const uri = image.uri
    const uriParts = uri.split('.')
    const fileType = uriParts[uriParts.length - 1]

    formData.append(
      image.name,
      JSON.stringify({
        name: uri.includes('.') ? `${image.name}.${fileType}` : `${image.name}`,
        data: image.base64.trimRight()
      })
    )

    if (!hasValue(data)) {
      return formData
    }
    for (const key in data) {
      data.hasOwnProperty(key) && formData.append(key, data[key])
    }
    return formData
  }

  static async request(props: IProps): Promise<responseType> {
    const {
      path,
      method,
      header = {},
      image,
      axiosProps,
      throw_error = true,
      includes,
      expand,
      withFile,
      cancelToken
    } = props
    const store: RootState = reduxStore.getState()
    const {idToken} = store.auth
    const url = `${env.ENDPOINT_API}${path}`

    const {isConnected} = await NetInfo.fetch()
    if (!isConnected) {
      /**
       * 12163 Disconnected
       * The Internet connection has been lost.
       */
      return navigateTo(routes.LOST_CONNECTION)
    }

    const defaultHeader = {
      ...(hasTextLength(idToken) && {Authorization: `Bearer ${idToken}`}),
      Accept: 'application/json',
      'Content-Type':
        image || withFile ? 'multipart/form-data' : 'application/json',
      ...header
    }

    const params = !image
      ? Request.createFormData(props)
      : Request.createImageFormData(props)

    return axios({
      method,
      url,
      headers: defaultHeader,
      data: params,
      ...(includes && {params: {includes}}),
      ...(expand && {params: {expand}}),
      ...axiosProps,
      ...(cancelToken && {cancelToken: cancelToken.token})
    })
      .then(function (response) {
        const {data} = response
        if (
          !data.data &&
          !data.status &&
          data.hasOwnProperty('message') &&
          throw_error
        ) {
          throw {response: {data: {...data, status: 422}}}
        }
        if (data && data.hasOwnProperty('error') && throw_error) {
          throw {response: {data: {...data, status: 422}}}
        }
        return data
      })
      .catch(function ({response}) {
        if (response?.status === 401) {
          hasTextLength(idToken) &&
            reduxStore?.dispatch?.(logout(() => resetNavigation(routes.LOGIN)))
        }
        if (response?.status === 404) {
          throw {
            response: {
              data: {message: 'Not Found', success: false, status: 404}
            }
          }
        }
        throw response
      })
  }
}
