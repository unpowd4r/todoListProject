import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../App'

export const removeTodolistAC = (todolistId: string) => {
	return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string) => {
	return { type: 'ADD-TODOLIST', payload: { title } } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
	return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const
}

export const changeTodolistFilterAC = (
	id: string,
	filter: FilterValuesType
) => {
	return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const
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
