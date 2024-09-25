import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../App'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	payload: {
		id: string
	}
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	payload: {
		title: string
	}
}

export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	payload: {
		id: string
		title: string
	}
}

export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	payload: {
		id: string
		filter: FilterValuesType
	}
}

type ActionType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

let todolistId1 = v1()
let todolistId2 = v1()

const initialState: TodolistType[] = [
	{ id: todolistId1, title: 'What to learn', filter: 'all' },
	{ id: todolistId2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (
	state: TodolistType[] = initialState,
	action: ActionType
) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.payload.id)
		}
		case 'ADD-TODOLIST': {
			const todolistId = v1()
			const newTodolist: TodolistType = {
				id: todolistId,
				title: 'New Todolist',
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
			throw new Error("I don't understand this type")
	}
}

export const removeTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', payload: { title } } as const
}

export const changeTodolistTitleAC = (
	id: string,
	title: string
): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const
}

export const changeTodolistFilterAC = (
	id: string,
	filter: FilterValuesType
): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } }
}
