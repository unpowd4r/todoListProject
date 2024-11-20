import { Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { Path } from 'common/router'
import { authSlice } from 'features/auth/model/authSlice'
import { useAddTodolistMutation } from 'features/todolists/api/todolistsApi'
import { Navigate } from 'react-router-dom'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'

export const Main = () => {
	const [addTodolist] = useAddTodolistMutation()

	const addTodolistCallback = (title: string) => {
		addTodolist(title)
	}

	const isLoggedIn = useAppSelector(authSlice.selectors.selectIsLoggedIn)

	if (!isLoggedIn) {
		return <Navigate to={Path.Login} />
	}

	return (
		<Container fixed>
			<Grid container sx={{ mb: '30px' }}>
				<AddItemForm addItem={addTodolistCallback} />
			</Grid>
			<Grid container spacing={4}>
				<Todolists />
			</Grid>
		</Container>
	)
}
