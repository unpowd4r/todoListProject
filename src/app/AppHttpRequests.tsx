import Checkbox from '@mui/material/Checkbox'
import { tasksApi } from 'features/todolists/api/taskApi'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'
import { TaskStatus } from '../common/enums/enums'
import {
	DomainTask,
	UpdateTaskModel,
} from '../features/todolists/api/tasksApi.types'
import { todolistsApi } from '../features/todolists/api/todolistsApi'
import { Todolist } from '../features/todolists/api/todolistsApi.types'

export const AppHttpRequests = () => {
	const [todolists, setTodolists] = useState<Todolist[]>([])
	const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

	useEffect(() => {
		todolistsApi.getTodolists().then(res => {
			const todolists = res.data
			setTodolists(todolists)
			todolists.forEach(tl => {
				tasksApi.getTasks(tl.id).then(res => {
					setTasks(prevTasks => ({
						...prevTasks,
						[tl.id]: res.data.items,
					}))
				})
			})
		})
	}, [])

	const createTodolistHandler = (title: string) => {
		todolistsApi.createTodolist(title).then(res => {
			const newTodolist = res.data.data.item
			setTodolists([newTodolist, ...todolists])
		})
	}

	const removeTodolistHandler = (id: string) => {
		todolistsApi.removeTodolist(id).then(res => {
			setTodolists(todolists.filter(t => t.id !== id))
		})
	}

	const updateTodolistHandler = (id: string, title: string) => {
		todolistsApi.updateTodolist({ id, title }).then(res => {
			setTodolists(todolists.map(t => (t.id === id ? { ...t, title } : t)))
		})
	}

	const createTaskHandler = (title: string, todolistId: string) => {
		tasksApi.createTask({ title, todolistId }).then(res => {
			const newTask = res.data.data.item
			setTasks(prevTasks => ({
				...prevTasks,
				[todolistId]: prevTasks[todolistId]
					? [newTask, ...prevTasks[todolistId]]
					: [newTask],
			}))
		})
	}

	const removeTaskHandler = (taskId: string, todolistId: string) => {
		tasksApi.deleteTask({ taskId, todolistId }).then(res => {
			setTasks({
				...tasks,
				[todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
			})
		})
	}

	const changeTaskStatusHandler = (
		e: ChangeEvent<HTMLInputElement>,
		task: DomainTask
	) => {
		let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

		const taskId = task.id
		const todolistId = task.todoListId

		const model: UpdateTaskModel = {
			status,
			title: task.title,
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
		}

		tasksApi.updateTaskStatus({ todolistId, taskId, model }).then(res => {
			const newTasks = tasks[task.todoListId].map(t =>
				t.id === task.id ? { ...t, ...model } : t
			)
			setTasks({ ...tasks, [task.todoListId]: newTasks })
		})
	}

	const changeTaskTitleHandler = (title: string, task: DomainTask) => {
		const model: UpdateTaskModel = {
			title,
			deadline: task.deadline,
			status: task.status,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
		}

		const todolistId = task.todoListId
		const taskId = task.id

		tasksApi.updateTaskTitle({ todolistId, taskId, model }).then(res => {
			const newTasks = tasks[task.todoListId].map(t =>
				t.id === task.id ? { ...t, ...model } : t
			)
			setTasks({ ...tasks, [task.todoListId]: newTasks })
		})
	}

	return (
		<div style={{ margin: '20px' }}>
			<AddItemForm addItem={createTodolistHandler} />

			{/* Todolists */}
			{todolists.map((tl: any) => {
				return (
					<div key={tl.id} style={todolist}>
						<div>
							<EditableSpan
								value={tl.title}
								onChange={(title: string) =>
									updateTodolistHandler(tl.id, title)
								}
							/>
							<button onClick={() => removeTodolistHandler(tl.id)}>x</button>
						</div>
						<AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

						{/* Tasks */}
						{!!tasks[tl.id] &&
							tasks[tl.id].map((task: DomainTask) => {
								return (
									<div key={task.id}>
										<Checkbox
											checked={task.status === 2 ? true : false}
											onChange={e => changeTaskStatusHandler(e, task)}
										/>
										<EditableSpan
											value={task.title}
											onChange={title => changeTaskTitleHandler(title, task)}
										/>
										<button onClick={() => removeTaskHandler(task.id, tl.id)}>
											x
										</button>
									</div>
								)
							})}
					</div>
				)
			})}
		</div>
	)
}

// Styles
const todolist: React.CSSProperties = {
	border: '1px solid black',
	margin: '20px 0',
	padding: '10px',
	width: '300px',
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column',
}
