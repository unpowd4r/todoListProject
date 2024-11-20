import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import {
	useRemoveTodolistMutation,
	useUpdateTodolistTitleMutation,
} from 'features/todolists/api/todolistsApi'
import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan'
import { DomainTodolist } from '../../../../model/todolistsSlice'
import s from './TodolistTitle.module.css'

type Props = {
	todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
	const { id, entityStatus } = todolist

	const [removeTodolist] = useRemoveTodolistMutation()
	const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

	const removeTodolistHandler = () => {
		removeTodolist(id)
	}

	const updateTodolistHandler = (title: string) => {
		updateTodolistTitle({ id, title })
	}

	return (
		<div className={s.container}>
			<h3>
				<EditableSpan
					value={todolist.title}
					onChange={updateTodolistHandler}
					disabled={entityStatus === 'loading'}
				/>
			</h3>
			<IconButton
				onClick={removeTodolistHandler}
				disabled={entityStatus === 'loading'}
			>
				<DeleteIcon />
			</IconButton>
		</div>
	)
}
