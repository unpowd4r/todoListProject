export type ThemeMode = 'dark' | 'light'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialState = typeof initialState

const initialState = {
	themeMode: 'dark' as ThemeMode,
	status: 'idle' as RequestStatus,
	error: null as string | null,
}

export const appReducer = (
	state: InitialState = initialState,
	action: ActionsType
): InitialState => {
	switch (action.type) {
		case 'CHANGE-THEME':
			return { ...state, themeMode: action.payload }

		case 'SET_STATUS':
			return { ...state, status: action.payload.status }

		case 'SET_ERROR':
			return { ...state, error: action.payload.error }

		case 'CLEAR-ERROR':
			return { ...state, error: null }

		default:
			return state
	}
}

export type changeThemeAction = ReturnType<typeof changeThemeAC>
export type setStatusAction = ReturnType<typeof setAppStatusAC>
export type setAppErrorAction = ReturnType<typeof setAppErrorAC>
export type clearAppErrorAction = ReturnType<typeof clearAppErrorAC>

type ActionsType =
	| changeThemeAction
	| setStatusAction
	| setAppErrorAction
	| clearAppErrorAction

export const changeThemeAC = (themeMode: ThemeMode) => {
	return {
		type: 'CHANGE-THEME',
		payload: themeMode,
	} as const
}

export const setAppStatusAC = (status: RequestStatus) => {
	return {
		type: 'SET_STATUS',
		payload: { status },
	} as const
}

export const setAppErrorAC = (error: string | null) => {
	return {
		type: 'SET_ERROR',
		payload: { error },
	} as const
}

export const clearAppErrorAC = () => ({ type: 'CLEAR-ERROR' }) as const
