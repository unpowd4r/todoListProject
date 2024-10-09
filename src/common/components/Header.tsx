import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Switch, Toolbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { changeThemeAC } from '../../app/app-reducer'
import { MenuButton } from '../../app/styledComponents/MenuButton'
import { useAppSelector } from '../hooks/useAppSelector'

export const Header = () => {
	const dispatch = useDispatch()
	const themeMode = useAppSelector(state => state.app.themeMode)

	const changeModeHandler = () => {
		dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
	}
	return (
		<AppBar position='static' sx={{ mb: '30px' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<IconButton color='inherit'>
					<MenuIcon />
				</IconButton>
				<div>
					<MenuButton>Login</MenuButton>
					<MenuButton>Logout</MenuButton>
					<MenuButton>Faq</MenuButton>
					<Switch color={'default'} onChange={changeModeHandler} />
				</div>
			</Toolbar>
		</AppBar>
	)
}
