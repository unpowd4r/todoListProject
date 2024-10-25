// import { title } from 'process'
// import { TasksStateType } from '../../../app/App'
// import { tasksReducer } from './task-reducer'
// import {
// 	addTodolistAC,
// 	DomainTodolist,
// 	todolistsReducer,
// } from './todolists-reducer'

// test('ids should be equals', () => {
// 	const startTasksState: TasksStateType = {}
// 	const startTodolistsState: DomainTodolist[] = []
// 	const newTodolist = {
// 		id: 'todolistId1',
// 		title: 'new todolist',
// 		addedDate: '',
// 		order: 0,
// 	}

// 	const action = addTodolistAC(newTodolist)

// 	const endTasksState = tasksReducer(startTasksState, action)
// 	const endTodolistsState = todolistsReducer(startTodolistsState, action)

// 	const keys = Object.keys(endTasksState)
// 	const idFromTasks = keys[0]
// 	const idFromTodolists = endTodolistsState[0].id

// 	expect(idFromTasks).toBe(action.payload.id)
// 	expect(idFromTodolists).toBe(action.payload.id)
// })
