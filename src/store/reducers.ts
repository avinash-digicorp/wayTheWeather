import {AnyAction, combineReducers} from 'redux'
import authSlice from './auth/slice'

export const RESET_STATE = 'RESET_STATE'

const appReducer = combineReducers({
  auth: authSlice
})

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === RESET_STATE) {
    state = {
      user: undefined,
      common: state.common,
      alert: state.alert,
      contacts: undefined,
      card: undefined,
      notification: undefined,
      payment: undefined
    }
  }

  return appReducer(state, action)
}

export default rootReducer
