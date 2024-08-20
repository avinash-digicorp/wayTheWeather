import {ILoginParams} from './types'

export const login = (params: ILoginParams) => {
  return new Promise(resolve => {
    const tempUser = {id: 1, name: 'Test User', token: 'fake-token', ...params}
    setTimeout(() => {
      resolve(tempUser)
    }, 1000)
  })
}
