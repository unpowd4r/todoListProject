import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	IconButton,
	LinearProgress,
	Switch,
	Toolbar,
} from '@mui/material'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { logoutTC } from 'features/auth/model/auth-reducer'
import { selectIsLoggedIn } from 'features/auth/model/authSelectors'
import { changeThemeAC } from '../../app/app-reducer'
import { MenuButton } from '../../app/styledComponents/MenuButton'
import { useAppSelector } from '../hooks/useAppSelector'

export const Header = () => {
	const dispatch = useAppDispatch()
	const themeMode = useAppSelector(state => state.app.themeMode)
	const status = useAppSelector(state => state.app.status)

	const changeModeHandler = () => {
		dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
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
