export interface IUser {
  id: string
  name: string
  token: string
  mobile?: string
  email?: string
  familyName?: string
  givenName?: string
  photo?: string
}

export interface ILoginParams {
  phone: string
}

export interface IInitialStateProps {
  user: IUser | null
  loading: boolean
  isLoggedIn: boolean
  idToken: string
}
