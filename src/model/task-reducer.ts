import { v1 } from 'uuid'
import { TasksStateType } from '../App'

export const taskReducer = (
	state: TasksStateType,
	action: ActionsType
): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter(
					t => t.id !== action.payload.taskId
				),
			}
		}

		case 'ADD-TASK': {
			const newTask = {
				id: '4',
				title: action.payload.title,
				isDone: false,
			}

			return {
				...state,
				[action.payload.todolistId]: [
					newTask,
					...state[action.payload.todolistId],
				],
			}
		}
		case 'CHANGE-TASK': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(ct =>
					ct.id === action.payload.taskId
						? { ...ct, isDone: action.payload.isDone }
						: ct
				),
			}
		}

		case 'CHANGE-TASK-TITLE': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(t =>
					t.id === action.payload.taskId
						? { ...t, title: action.payload.title }
						: t
				),
			}
		}

		case 'ADD-TODOLIST': {
			return {
				...state,
				[action.todolistId]: [],
			}
		}

		default:
			throw new Error("I don't understand this type")
	}
}

export const removeTaskAC = (payload: {
	taskId: string
	todolistId: string
}) => {
	return {
		type: 'REMOVE-TASK',
		payload,
	} as const
}

export type SomeActionType = ReturnType<typeof removeTaskAC>
export type RemoveActionType = ReturnType<typeof addTaskAC>
export type ChangeActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ActionsType =
	| SomeActionType
	| RemoveActionType
	| ChangeActionType
	| ChangeTitleActionType
	| AddTodolistActionType

export const addTaskAC = (payload: { title: string; todolistId: string }) => {
	return {
		type: 'ADD-TASK',
		payload,
	} as const
}

export const changeTaskStatusAC = (payload: {
	taskId: string
	isDone: boolean
	todolistId: string
}) => {
	return {
		type: 'CHANGE-TASK',
		payload,
	} as const
}

export const changeTaskTitleAC = (payload: {
	taskId: string
	todolistId: string
	title: string
}) => {
	return {
		type: 'CHANGE-TASK-TITLE',
		payload,
	} as const
}

export const addTodolistAC = (title: string) => {
	return {
		type: 'ADD-TODOLIST',
		title,
		todolistId: v1(),
	} as const
}
