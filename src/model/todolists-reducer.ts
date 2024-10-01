import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../app/App'

export const removeTodolistAC = (todolistId: string) => {
	return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string) => {
	const todolistId = v1()
	return { type: 'ADD-TODOLIST', payload: { title, todolistId } } as const
}

export const changeTodolistTitleAC = (payload: {
	id: string
	title: string
}) => {
	return { type: 'CHANGE-TODOLIST-TITLE', payload } as const
}

export const changeTodolistFilterAC = (payload: {
	id: string
	filter: FilterValuesType
}) => {
	return { type: 'CHANGE-TODOLIST-FILTER', payload } as const
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<
	typeof changeTodolistTitleAC
>
export type ChangeTodolistFilterActionType = ReturnType<
	typeof changeTodolistFilterAC
>

type ActionType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

let todolistId1 = v1()
let todolistId2 = v1()

const initialState: TodolistType[] = []

export const todolistsReducer = (
	state: TodolistType[] = initialState,
	action: ActionType
): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.payload.id)
		}
		case 'ADD-TODOLIST': {
			const newTodolist: TodolistType = {
				id: action.payload.todolistId,
				title: action.payload.title,
				filter: 'all',
			}
			return [...state, newTodolist]
		}

		case 'CHANGE-TODOLIST-TITLE': {
			return state.map(tl =>
				tl.id === action.payload.id
					? { ...tl, title: action.payload.title }
					: tl
			)
		}

		case 'CHANGE-TODOLIST-FILTER': {
			return state.map(tl => {
				return tl.id === action.payload.id
					? { ...tl, filter: action.payload.filter }
					: tl
			})
		}

		default:
			return state
	}
}
