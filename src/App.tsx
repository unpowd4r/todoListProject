import { useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { Todolist } from './components/Todolist'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Redux', isDone: false },
		{ id: v1(), title: 'Typescript', isDone: false },
		{ id: v1(), title: 'RTK query', isDone: false },
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	const addTask = (title: string) => {
		const newTask = {
			id: v1(),
			title,
			isDone: false,
		}
		const newTasks = [newTask, ...tasks]
		setTasks(newTasks)
	}

	let tasksForTodoList = tasks
	if (filter === 'active') {
		tasksForTodoList = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodoList = tasks.filter(task => task.isDone)
	}

	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter(task => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}
	return (
		<div className='App'>
			<Todolist
				title='What to learn'
				tasks={tasksForTodoList}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
			/>
		</div>
	)
}
