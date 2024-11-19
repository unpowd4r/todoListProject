import { createSlice } from '@reduxjs/toolkit'
import { setAppStatus } from 'app/appSlice'
import { ResultCode } from 'common/enums/enums'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { clearTodolists } from 'features/todolists/model/todolistsSlice'
import { Dispatch } from 'redux'
import { authApi } from '../api/authApi'
import { LoginArgs } from '../api/authApi.types'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
		isInitialized: false,
	},
	reducers: create => ({
		setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		}),
		setIsInitialized: create.reducer<{ isInitialized: boolean }>(
			(state, action) => {
				state.isInitialized = action.payload.isInitialized
			}
		),
	}),
	selectors: {
		selectIsLoggedIn: state => state.isLoggedIn,
		selectIsInitialized: state => state.isInitialized,
	},
})

export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions

export const authReducer = authSlice.reducer

export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	authApi
		.login(data)
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: 'succeeded' }))
				dispatch(setIsLoggedIn({ isLoggedIn: true }))
				localStorage.setItem('sn-token', res.data.data.token)
			} else {
				handleServerAppError(res.data, dispatch)
				dispatch(setAppStatus({ status: 'failed' }))
			}
		})
		.catch(error => {
			handleServerAppError(error, dispatch)
			dispatch(setAppStatus({ status: 'failed' }))
		})
}

export const logoutTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	authApi
		.logout()
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: 'succeeded' }))
				dispatch(clearTodolists())
				dispatch(setIsLoggedIn({ isLoggedIn: false }))
				localStorage.removeItem('sn-token')
			} else {
				handleServerAppError(res.data, dispatch)
				dispatch(setAppStatus({ status: 'failed' }))
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
			dispatch(setAppStatus({ status: 'failed' }))
		})
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	authApi
		.me()
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: 'succeeded' }))
				dispatch(setIsLoggedIn({ isLoggedIn: true }))
			} else {
				handleServerAppError(res.data, dispatch)
				dispatch(setAppStatus({ status: 'failed' }))
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
			dispatch(setAppStatus({ status: 'failed' }))
		})
		.finally(() => {
			dispatch(setIsInitialized({ isInitialized: true }))
		})
}
