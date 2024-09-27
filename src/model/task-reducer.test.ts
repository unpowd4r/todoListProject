import { TasksStateType } from '../App'
import {
	addTaskAC,
	addTodolistAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	taskReducer,
} from './task-reducer'

test('correct task should be deleted from correct array', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = taskReducer(
		startState,
		removeTaskAC({
			taskId: '2',
			todolistId: 'todolistId2',
		})
	)

	expect(endState).toEqual({
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '3', title: 'tea', isDone: false },
		],
	})
})

test('correct task should be added to correct array', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = taskReducer(
		startState,
		addTaskAC({ title: 'juice', todolistId: 'todolistId2' })
	)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juice')
	expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = taskReducer(
		startState,
		changeTaskStatusAC({
			taskId: '2',
			isDone: false,
			todolistId: 'todolistId2',
		})
	)

	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = taskReducer(
		startState,
		changeTaskTitleAC({
			taskId: '2',
			todolistId: 'todolistId2',
			title: 'new taskName',
		})
	)
	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId2'][1].title).toBe('new taskName')
})

test('new array should be added when new todolist is added', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const endState = taskReducer(startState, addTodolistAC('new todolist'))

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})
