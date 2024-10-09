import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Header } from '../common/components/Header'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { getTheme } from '../common/theme/theme'
import { Main } from './Main'
import { selectThemeMode } from './appSelectors'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export const App = () => {
	const themeMode = useAppSelector(selectThemeMode)

	return (
		<ThemeProvider theme={getTheme(themeMode)}>
			<CssBaseline />
			<Header />
			<Main />
		</ThemeProvider>
	)
}
