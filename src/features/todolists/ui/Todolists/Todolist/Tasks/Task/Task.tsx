import DeleteIcon from '@mui/icons-material/Delete'
import { Checkbox, IconButton, ListItem } from '@mui/material'
import { EditableSpan } from 'common/components/'
import { TaskStatus } from 'common/enums/enums'
import { DomainTask } from 'features/todolists/api/tasksApi.types'
import { DomainTodolist } from 'features/todolists/model/todolists-reducer'
import { ChangeEvent } from 'react'
import { useAppDispatch } from '../../../../../../../common/hooks/useAppDispatch'
import {
	changeTaskStatusTC,
	changeTaskTitleTC,
	removeTaskTC,
} from '../../../../../model/task-reducer'
import { getListItemSx } from './Task.styles'

type Props = {
	task: DomainTask
	todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
	const dispatch = useAppDispatch()

	const removeTaskHandler = () => {
		dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
	}

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const status = e.currentTarget.checked
			? TaskStatus.Completed
			: TaskStatus.New
		dispatch(
			changeTaskStatusTC({ taskId: task.id, status, todolistId: todolist.id })
		)
	}

	const changeTaskTitleHandler = (title: string) => {
		dispatch(
			changeTaskTitleTC({ taskId: task.id, title, todolistId: todolist.id })
		)
	}

	return (
		<ListItem
			key={task.id}
			sx={getListItemSx(task.status === TaskStatus.Completed)}
		>
			<div>
				<Checkbox
					checked={task.status === TaskStatus.Completed}
					onChange={changeTaskStatusHandler}
				/>
				<EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
			</div>
			<IconButton onClick={removeTaskHandler}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	)
}
