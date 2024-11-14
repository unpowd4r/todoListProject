import DeleteIcon from '@mui/icons-material/Delete'
import { Checkbox, IconButton, ListItem } from '@mui/material'
import { EditableSpan } from 'common/components/'
import { TaskStatus } from 'common/enums/enums'
import { DomainTask } from 'features/todolists/api/tasksApi.types'
import { DomainTodolist } from 'features/todolists/model/todolistsSlice'
import { ChangeEvent } from 'react'
import { useAppDispatch } from '../../../../../../../common/hooks/useAppDispatch'
import { removeTaskTC, updateTaskTC } from '../../../../../model/taskSlice'
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
			updateTaskTC({
				taskId: task.id,
				todolistId: todolist.id,
				domainModel: { status },
			})
		)
	}

	const changeTaskTitleHandler = (title: string) => {
		dispatch(
			updateTaskTC({
				taskId: task.id,
				todolistId: todolist.id,
				domainModel: { title },
			})
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
					disabled={todolist.entityStatus === 'loading'}
				/>
				<EditableSpan
					value={task.title}
					onChange={changeTaskTitleHandler}
					disabled={todolist.entityStatus === 'loading'}
				/>
			</div>
			<IconButton
				onClick={removeTaskHandler}
				disabled={todolist.entityStatus === 'loading'}
			>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	)
}
