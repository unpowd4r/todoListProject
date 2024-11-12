import { Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { Path } from 'common/router'
import { selectIsLoggedIn } from 'features/auth/model/authSelectors'
import { addTodolistTC } from 'features/todolists/model/todolists-reducer'
import { Navigate } from 'react-router-dom'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'

export const Main = () => {
	const dispatch = useAppDispatch()

	const addTodolist = (title: string) => {
		dispatch(addTodolistTC(title))
	}

	const isLoggedIn = useAppSelector(selectIsLoggedIn)

	if (!isLoggedIn) {
		return <Navigate to={Path.Login} />
	}

	return (
		<Container fixed>
			<Grid container sx={{ mb: '30px' }}>
				<AddItemForm addItem={addTodolist} />
			</Grid>
			<Grid container spacing={4}>
				<Todolists />
			</Grid>
		</Container>
	)
}
