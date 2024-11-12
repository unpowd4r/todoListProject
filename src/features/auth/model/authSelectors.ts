import { RootState } from 'app/store'

export const selectIsLoggedIn = (state: RootState): boolean =>
	state.auth.isLoggedIn

export const selectIsInitialized = (state: RootState): boolean =>
	state.auth.isInitialized
