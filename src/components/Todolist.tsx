import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType, TaskType } from '../App'
import { Button } from './Buttons'

type TodoPropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean) => void
}

export const Todolist = ({
	title,
	tasks,
	removeTask,
	changeFilter,
	addTask,
	changeTaskStatus,
}: TodoPropsType) => {
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addTaskHandler = () => {
		if (taskTitle.trim() !== '') {
			addTask(taskTitle.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter)
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input
					className={error ? 'error' : ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler} />
				{error && <div className={'error-message'}>{error}</div>}
			</div>
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map(task => {
						const removeTaskHandler = () => {
							removeTask(task.id)
						}
						const changeTaskStatusHandler = (
							e: ChangeEvent<HTMLInputElement>
						) => {
							const newStatusValue = e.currentTarget.checked
							changeTaskStatus(task.id, newStatusValue)
						}
						return (
							<li key={task.id}>
								<input
									type='checkbox'
									checked={task.isDone}
									onChange={changeTaskStatusHandler}
								/>
								<span>{task.title}</span>
								<Button title={'x'} onClick={removeTaskHandler} />
							</li>
						)
					})}
				</ul>
			)}
			<div>
				<Button title={'All'} onClick={() => changeFilterTasksHandler('all')} />
				<Button
					title={'Active'}
					onClick={() => changeFilterTasksHandler('active')}
				/>
				<Button
					title={'Completed'}
					onClick={() => changeFilterTasksHandler('completed')}
				/>
			</div>
		</div>
	)
}
