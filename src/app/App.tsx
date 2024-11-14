import { CircularProgress } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ErrorSnackbar } from 'common/components'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { authSlice, initializeAppTC } from 'features/auth/model/authSlice'
import { DomainTask } from 'features/todolists/api/tasksApi.types'
import { fetchTodolistsTC } from 'features/todolists/model/todolistsSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../common/components/Header'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { getTheme } from '../common/theme/theme'
import s from './App.module.css'
import { selectThemeMode } from './appSelectors'

export type TasksStateType = {
	[key: string]: DomainTask[]
}

export const App = () => {
	const themeMode = useAppSelector(selectThemeMode)
	const isInitialized = useAppSelector(authSlice.selectors.selectIsInitialized)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	useEffect(() => {
		dispatch(fetchTodolistsTC)
	}, [])

	return (
		<ThemeProvider theme={getTheme(themeMode)}>
			<CssBaseline />
			{isInitialized && (
				<>
					<Header />
					<Outlet />
				</>
			)}
			{!isInitialized && (
				<div className={s.circularProgressContainer}>
					<CircularProgress size={150} thickness={3} />
				</div>
			)}

			<ErrorSnackbar />
		</ThemeProvider>
	)
}
