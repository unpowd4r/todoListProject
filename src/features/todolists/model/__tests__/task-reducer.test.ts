import { TaskStatus } from 'common/enums/enums'
import { DomainTask } from 'features/todolists/api/tasksApi.types'
import { v1 } from 'uuid'
import { addTask, removeTask, tasksReducer, updateTask } from '../taskSlice'
import { addTodolist, removeTodolist } from '../todolistsSlice'

let startState: { [key: string]: DomainTask[] }

beforeEach(() => {
	startState = {
		todolistId1: [
			{
				id: '1',
				title: 'CSS',
				status: TaskStatus.New,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId1',
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatus.Completed,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId1',
			},
			{
				id: '3',
				title: 'React',
				status: TaskStatus.New,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId1',
			},
		],
		todolistId2: [
			{
				id: '1',
				title: 'bread',
				status: TaskStatus.New,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId2',
			},
			{
				id: '2',
				title: 'milk',
				status: TaskStatus.Completed,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId2',
			},
			{
				id: '3',
				title: 'tea',
				status: TaskStatus.New,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId2',
			},
		],
	}
})

test('correct task should be deleted from correct array', () => {
	const endState = tasksReducer(
		startState,
		removeTask({ taskId: '2', todolistId: 'todolistId2' })
	)

	expect(endState).toEqual({
		todolistId1: [
			{
				id: '1',
				title: 'CSS',
				status: TaskStatus.New,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId1',
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatus.Completed,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId1',
			},
			{
				id: '3',
				title: 'React',
				status: TaskStatus.New,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId1',
			},
		],
		todolistId2: [
			{
				id: '1',
				title: 'bread',
				status: TaskStatus.New,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId2',
			},
			{
				id: '3',
				title: 'tea',
				status: TaskStatus.New,
				addedDate: '',
				priority: 1,
				order: 0,
				startDate: '',
				deadline: '',
				description: '',
				todoListId: 'todolistId2',
			},
		],
	})
})

test('correct task should be added to correct array', () => {
	const newTask: DomainTask = {
		id: v1(),
		title: 'juice',
		status: TaskStatus.New,
		addedDate: '',
		priority: 1,
		order: 0,
		startDate: '',
		deadline: '',
		description: '',
		todoListId: 'todolistId2',
	}
	const endState = tasksReducer(startState, addTask({ task: newTask }))

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juice')
	expect(endState['todolistId2'][0].status).toBe(TaskStatus.New)
})

test('status of specified task should be changed', () => {
	const endState = tasksReducer(
		startState,
		updateTask({
			taskId: '2',
			todolistId: 'todolistId2',
			domainModel: { status: TaskStatus.Completed }, // Используем значение из TaskStatus
		})
	)

	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId2'][1].status).toBe(TaskStatus.Completed) // Проверка обновленного статуса
})

test('title of specified task should be changed', () => {
	const action = updateTask({
		taskId: '2',
		todolistId: 'todolistId2',
		domainModel: { title: 'new taskName' },
	})
	const endState = tasksReducer(startState, action)

	expect(endState['todolistId2'][1].title).toBe('new taskName')
})

test('new array should be added when new todolist is added', () => {
	const newTodolist = {
		id: v1(),
		title: 'new todolist',
		addedDate: '',
		order: 0,
	}
	const endState = tasksReducer(
		startState,
		addTodolist({ todolist: newTodolist })
	)

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
	const action = removeTodolist({ id: 'todolistId2' })

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).toBeUndefined()
})
