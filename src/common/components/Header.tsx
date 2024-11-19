import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	IconButton,
	LinearProgress,
	Switch,
	Toolbar,
} from '@mui/material'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { logoutTC, selectIsLoggedIn } from 'features/auth/model/authSlice'
import {
	changeTheme,
	selectAppStatus,
	selectThemeMode,
} from '../../app/appSlice'
import { MenuButton } from '../../app/styledComponents/MenuButton'
import { useAppSelector } from '../hooks/useAppSelector'

export const Header = () => {
	const dispatch = useAppDispatch()
	const themeMode = useAppSelector(selectThemeMode)
	const status = useAppSelector(selectAppStatus)

	const changeModeHandler = () => {
		dispatch(
			changeTheme({ themeMode: themeMode === 'light' ? 'dark' : 'light' })
		)
	}

	const isLoggedIn = useAppSelector(selectIsLoggedIn)

	const handleLogout = () => {
		dispatch(logoutTC())
	}

	return (
		<AppBar position='static' sx={{ mb: '30px' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<IconButton color='inherit'>
					<MenuIcon />
				</IconButton>
				<div>
					{isLoggedIn && <MenuButton onClick={handleLogout}>Logout</MenuButton>}
					<MenuButton>Faq</MenuButton>
					<Switch color={'default'} onChange={changeModeHandler} />
				</div>
			</Toolbar>
			{status === 'loading' && <LinearProgress />}
		</AppBar>
	)
}
