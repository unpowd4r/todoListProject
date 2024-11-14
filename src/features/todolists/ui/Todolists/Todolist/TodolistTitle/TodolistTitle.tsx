import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch'
import {
	DomainTodolist,
	removeTodolistTC,
	updateTodolistTitleTC,
} from '../../../../model/todolistsSlice'
import s from './TodolistTitle.module.css'

type Props = {
	todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
	const { id, entityStatus } = todolist

	const dispatch = useAppDispatch()

	const removeTodolistHandler = () => {
		dispatch(removeTodolistTC(id))
	}

	const updateTodolistHandler = (title: string) => {
		dispatch(updateTodolistTitleTC({ id, title }))
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
