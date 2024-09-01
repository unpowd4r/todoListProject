import './App.css'
import { Todolist } from './components/Todolist'

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export const App = () => {
	const tasks1: Array<TaskType> = [
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
		{ id: 4, title: 'Redux', isDone: false },
		{ id: 5, title: 'Typescript', isDone: false },
		{ id: 6, title: 'RTK query', isDone: false },
	]

	const tasks2: Array<TaskType> = []
	return (
		<div className='App'>
			<Todolist title='What to learn' tasks={tasks1} date={'03.01.2024'} />
			<Todolist title='Songs' tasks={tasks2} />
		</div>
	)
}
