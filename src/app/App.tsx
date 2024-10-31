import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ErrorSnackbar } from 'common/components'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { DomainTask } from 'features/todolists/api/tasksApi.types'
import { fetchTodolistsTC } from 'features/todolists/model/todolists-reducer'
import { useEffect } from 'react'
import { Header } from '../common/components/Header'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { getTheme } from '../common/theme/theme'
import { Main } from './Main'
import { selectThemeMode } from './appSelectors'

export type TasksStateType = {
	[key: string]: DomainTask[]
}

export const App = () => {
	const themeMode = useAppSelector(selectThemeMode)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchTodolistsTC)
	}, [])

	return (
		<ThemeProvider theme={getTheme(themeMode)}>
			<CssBaseline />
			<Header />
			<Main />
			<ErrorSnackbar />
		</ThemeProvider>
	)
}
