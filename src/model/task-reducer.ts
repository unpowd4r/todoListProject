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
				id: v1(),
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
			const tasks = state[action.payload.todolistId]

			if (!tasks) {
				return state
			}
			return {
				...state,
				[action.payload.todolistId]: tasks.map(t =>
					t.id === action.payload.taskId
						? { ...t, title: action.payload.title }
						: t
				),
			}
		}

		case 'ADD-TODOLIST': {
			return {
				...state,
				[action.payload.todolistId]: [],
			}
		}

		case 'DELETE-TODOLIST': {
			const newState = { ...state }
			delete newState[action.payload.todolistId]
			return newState
		}

		default:
			throw new Error("I don't understand this type")
	}
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

export const removeTaskAC = (taskId: string, todolistId: string) => {
	return {
		type: 'REMOVE-TASK',
		payload: { taskId, todolistId },
	} as const
}

export const addTodolistAC = (title: string) => {
	const newTodolistId = v1()
	return {
		type: 'ADD-TODOLIST',
		payload: { title, todolistId: newTodolistId },
	} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
	return {
		type: 'ADD-TASK',
		payload: { title, todolistId },
	} as const
}

export const changeTaskStatusAC = (
	taskId: string,
	isDone: boolean,
	todolistId: string
) => {
	return {
		type: 'CHANGE-TASK',
		payload: { taskId, isDone, todolistId },
	} as const
}

export const changeTaskTitleAC = (
	taskId: string,
	title: string,
	todolistId: string
) => {
	return {
		type: 'CHANGE-TASK-TITLE',
		payload: { taskId, title, todolistId },
	} as const
}

export const removeTodolistAC = (todolistId: string) => {
	return {
		type: 'DELETE-TODOLIST',
		payload: { todolistId },
	} as const
}
