import { ChangeEvent } from 'react'
import { FilterValuesType, TaskType } from '../App'
import { AddItemForm } from './AddItemForm'
import { Button } from './Buttons'
import { EditableSpan } from './EditableSpan'

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
		<div className='todo-card'>
			<div className={'todolist-title-container'}>
				<h3>
					<EditableSpan value={title} onChange={updateTodolistHandler} />
				</h3>
				<Button title={'x'} onClick={removeTodolistHandler} />
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
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
							<li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input
									type='checkbox'
									checked={task.isDone}
									onChange={changeTaskStatusHandler}
								/>
								<EditableSpan
									value={task.title}
									onChange={changeTaskTitleHandler}
								/>
								<Button title={'x'} onClick={removeTaskHandler} />
							</li>
						)
					})}
				</ul>
			)}
			<div>
				<Button
					className={filter === 'all' ? 'active-filter' : ''}
					title={'All'}
					onClick={() => changeFilterTasksHandler('all')}
				/>
				<Button
					className={filter === 'active' ? 'active-filter' : ''}
					title={'Active'}
					onClick={() => changeFilterTasksHandler('active')}
				/>
				<Button
					className={filter === 'completed' ? 'active-filter' : ''}
					title={'Completed'}
					onClick={() => changeFilterTasksHandler('completed')}
				/>
			</div>
		</div>
	)
}
