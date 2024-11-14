import { ThemeMode } from './appSlice'
import { RootState } from './store'

export const selectThemeMode = (state: RootState): ThemeMode =>
	state.app.themeMode
