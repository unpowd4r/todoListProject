import { Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { addTodolistAC } from '../features/todolists/model/task-reducer'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'

export const Main = () => {
	const dispatch = useAppDispatch()

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))
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
