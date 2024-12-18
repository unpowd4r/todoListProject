import { List } from '@mui/material'
import { TaskStatus } from 'common/enums/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { fetchTasksTC, selectTasks } from 'features/todolists/model/taskSlice'
import { DomainTodolist } from 'features/todolists/model/todolistsSlice'
import { useEffect } from 'react'
import { useAppSelector } from '../../../../../../common/hooks/useAppSelector'
import { Task } from './Task/Task'

type Props = {
	todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
	const tasks = useAppSelector(selectTasks)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTasksTC(todolist.id))
	}, [])

	const allTodolistTasks = tasks[todolist.id]

	let tasksForTodolist = allTodolistTasks

	if (todolist.filter === 'active') {
		tasksForTodolist = allTodolistTasks.filter(
			task => task.status === TaskStatus.New
		)
	}

	if (todolist.filter === 'completed') {
		tasksForTodolist = allTodolistTasks.filter(
			task => task.status === TaskStatus.Completed
		)
	}

	return (
		<>
			{tasksForTodolist?.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<List>
					{tasksForTodolist?.map(task => {
						return <Task key={task.id} task={task} todolist={todolist} />
					})}
				</List>
			)}
		</>
	)
}
