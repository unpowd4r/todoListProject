import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import { ChangeEvent } from 'react'
import { FilterValuesType, TaskType } from '../App'
import { AddItemForm } from './AddItemForm'
// import { Button } from './Buttons'
import { Box, Checkbox, ListItem } from '@mui/material'
import { EditableSpan } from './EditableSpan'
import {
	filterButtonsContainerSx,
	getListItemSx,
} from './styledComponents/Todolist.styles'

type TodoPropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	filter: FilterValuesType
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (
		taskId: string,
		taskStatus: boolean,
		newTodolistTasks: string
	) => void
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
	title,
	tasks,
	removeTask,
	changeFilter,
	addTask,
	changeTaskStatus,
	filter,
	todolistId,
	removeTodolist,
	updateTask,
	updateTodolist,
}: TodoPropsType) => {
	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, todolistId)
	}

	const addTaskCallback = (title: string) => {
		addTask(title, todolistId)
	}

	const updateTodolistHandler = (title: string) => {
		updateTodolist(todolistId, title)
	}

	return (
		<div>
			<div className={'todolist-title-container'}>
				<h3>
					<EditableSpan value={title} onChange={updateTodolistHandler} />
				</h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon />
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<List>
					{tasks.map(task => {
						const removeTaskHandler = () => {
							removeTask(task.id, todolistId)
						}
						const changeTaskStatusHandler = (
							e: ChangeEvent<HTMLInputElement>
						) => {
							const newStatusValue = e.currentTarget.checked
							changeTaskStatus(task.id, newStatusValue, todolistId)
						}

						const changeTaskTitleHandler = (title: string) => {
							updateTask(todolistId, task.id, title)
						}
						return (
							<ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<Checkbox
									checked={task.isDone}
									onChange={changeTaskStatusHandler}
								/>

								<EditableSpan
									value={task.title}
									onChange={changeTaskTitleHandler}
								/>
								{/* <Button title={'x'} onClick={removeTaskHandler} /> */}
								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon />
								</IconButton>
							</ListItem>
						)
					})}
				</List>
			)}
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
		</div>
	)
}
