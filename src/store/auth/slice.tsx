import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import * as service from './service'
import {IInitialStateProps, ILoginParams} from './types'

const initialState: IInitialStateProps = {
  user: null,
  loading: false,
  isLoggedIn: false,
  idToken: 'string'
}

export const login = createAsyncThunk(
  'auth/login',
  async (params: ILoginParams) => {
    const response = await service.login(params)
    return response
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null
      state.isLoggedIn = false
      action.payload?.()
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
        state.idToken = action.payload.token
        state.loading = false
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export const {logout} = authSlice.actions

export default authSlice.reducer
