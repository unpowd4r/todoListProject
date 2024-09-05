import { useState } from 'react'
import { FilterValuesType, TaskType } from '../App'
import { Button } from './Buttons'

type TodoPropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (title: string) => void
}

export const Todolist = ({
	title,
	tasks,
	removeTask,
	changeFilter,
	addTask,
}: TodoPropsType) => {
	const [taskTitle, setTaskTitle] = useState('')

	const addTaskHandler = () => {
		addTask(taskTitle)
		setTaskTitle('')
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input
					value={taskTitle}
					onChange={event => setTaskTitle(event.currentTarget.value)}
				/>
				<Button title={'+'} onClick={addTaskHandler} />
			</div>
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map(task => {
						return (
							<li key={task.id}>
								<input type='checkbox' checked={task.isDone} />
								<span>{task.title}</span>
								<Button title={'x'} onClick={() => removeTask(task.id)} />
							</li>
						)
					})}
				</ul>
			)}
			<div>
				<Button title={'All'} onClick={() => changeFilter('all')} />
				<Button title={'Active'} onClick={() => changeFilter('active')} />
				<Button title={'Completed'} onClick={() => changeFilter('completed')} />
			</div>
		</div>
	)
}
