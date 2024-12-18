import { Box, Button } from '@mui/material'
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch'
import {
	changeTodolistFilter,
	DomainTodolist,
	FilterValuesType,
} from '../../../../model/todolistsSlice'
import { filterButtonsContainerSx } from './FilterTasksButtons.styles'

type FilterTasksButtonsProps = {
	todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: FilterTasksButtonsProps) => {
	const { filter, id } = todolist

	const dispatch = useAppDispatch()

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(changeTodolistFilter({ filter, id }))
	}

	return (
		<Box sx={filterButtonsContainerSx}>
			<Button
				variant={filter === 'all' ? 'outlined' : 'text'}
				color={'inherit'}
				onClick={() => changeFilterTasksHandler('all')}
			>
				All
			</Button>
			<Button
				variant={filter === 'active' ? 'outlined' : 'text'}
				color={'primary'}
				onClick={() => changeFilterTasksHandler('active')}
			>
				Active
			</Button>
			<Button
				variant={filter === 'completed' ? 'outlined' : 'text'}
				color={'secondary'}
				onClick={() => changeFilterTasksHandler('completed')}
			>
				Completed
			</Button>
		</Box>
	)
}
