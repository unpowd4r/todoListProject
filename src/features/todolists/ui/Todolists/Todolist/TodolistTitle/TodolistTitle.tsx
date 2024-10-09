import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { TodolistType } from '../../../../../../app/App'
import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch'
import {
	changeTodolistTitleAC,
	removeTodolistAC,
} from '../../../../model/todolists-reducer'
import s from './TodolistTitle.module.css'

type Props = {
	todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
	const { id } = todolist

	const dispatch = useAppDispatch()

	const removeTodolistHandler = () => {
		dispatch(removeTodolistAC(id))
	}

	const updateTodolistHandler = (title: string) => {
		dispatch(changeTodolistTitleAC({ id, title }))
	}

	return (
		<div className={s.container}>
			<h3>
				<EditableSpan value={todolist.title} onChange={updateTodolistHandler} />
			</h3>
			<IconButton onClick={removeTodolistHandler}>
				<DeleteIcon />
			</IconButton>
		</div>
	)
}
