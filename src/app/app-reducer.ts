export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
	themeMode: 'dark' as ThemeMode,
}

export const appReducer = (
	state: InitialState = initialState,
	action: ActionsType
): InitialState => {
	switch (action.type) {
		case 'CHANGE-THEME':
			return { ...state, themeMode: action.payload }
		default:
			return state
	}
}

export type changeThemeAction = ReturnType<typeof changeThemeAC>

type ActionsType = changeThemeAction

export const changeThemeAC = (themeMode: ThemeMode) => {
	return {
		type: 'CHANGE-THEME',
		payload: themeMode,
	} as const
}
