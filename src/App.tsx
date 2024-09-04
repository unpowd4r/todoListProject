import { useState } from 'react'
import './App.css'
import { Todolist } from './components/Todolist'

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export const App = () => {
	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
		{ id: 4, title: 'Redux', isDone: false },
		{ id: 5, title: 'Typescript', isDone: false },
		{ id: 6, title: 'RTK query', isDone: false },
	])

	const removeTask = (taskId: number) => {
		const filteredTasks = tasks.filter(task => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}
	return (
		<div className='App'>
			<Todolist title='What to learn' tasks={tasks} removeTask={removeTask} />
		</div>
	)
}
