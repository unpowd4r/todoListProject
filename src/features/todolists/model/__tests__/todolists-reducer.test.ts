import { v1 } from 'uuid'
import {
	addTodolist,
	changeTodolistFilter,
	changeTodolistTitle,
	DomainTodolist,
	removeTodolist,
	todolistsReducer,
} from '../todolistsSlice'

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[]

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()

	startState = [
		{
			id: todolistId1,
			title: 'What to learn',
			addedDate: '2024-11-14T08:00:00.000Z',
			order: 1,
			filter: 'all',
			entityStatus: 'idle',
		},
		{
			id: todolistId2,
			title: 'What to buy',
			addedDate: '2024-11-13T08:00:00.000Z',
			order: 2,
			filter: 'all',
			entityStatus: 'idle',
		},
	]
})

test('correct todolist should be removed', () => {
	const endState = todolistsReducer(
		startState,
		removeTodolist({ id: todolistId1 })
	)
	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
	const newTodolist = {
		id: v1(),
		title: 'New Todolist',
		addedDate: '2024-11-14T08:00:00.000Z',
		order: 1,
		filter: 'all',
		entityStatus: 'idle',
	}
	const endState = todolistsReducer(
		startState,
		addTodolist({ todolist: newTodolist })
	)
	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe('New Todolist')
	expect(endState[0].id).toBe(newTodolist.id)
})

test('correct todolist should change its name', () => {
	const newTitle = 'New Todolist'

	const endState = todolistsReducer(
		startState,
		changeTodolistTitle({ id: todolistId2, title: newTitle })
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTitle)
})

test('correct filter of todolist should be changet', () => {
	const newFilter = 'completed'
	const endState = todolistsReducer(
		startState,
		changeTodolistFilter({ id: todolistId2, filter: newFilter })
	)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})
