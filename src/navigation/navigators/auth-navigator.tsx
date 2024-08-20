import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {routes} from '../navigation-routes'
import Welcome from 'screens/auth/welcome'
import Login from 'screens/auth/login'
import {VerifyOtp} from 'screens/auth/verify-otp'
const Stack = createStackNavigator()

export const AuthNavigator = (
  <>
    <Stack.Screen name={routes.WELCOME} component={Welcome} />
    <Stack.Screen name={routes.LOGIN} component={Login} />
    <Stack.Screen name={routes.VERIFY_OTP} component={VerifyOtp} />
  </>
)
