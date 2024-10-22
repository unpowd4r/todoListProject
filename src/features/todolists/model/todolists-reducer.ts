import { AppDispatch } from 'app/store'
import { v1 } from 'uuid'
import { todolistsApi } from '../api/todolistsApi'
import { Todolist } from '../api/todolistsApi.types'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
	filter: FilterValuesType
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
	state: DomainTodolist[] = initialState,
	action: ActionType
): DomainTodolist[] => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
		}

		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.payload.id)
		}
		case 'ADD-TODOLIST': {
			const newTodolist: DomainTodolist = {
				id: action.payload.todolistId,
				title: action.payload.title,
				filter: 'all',
				addedDate: '',
				order: 0,
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

export const setTodolistsAC = (todolists: Todolist[]) => {
	return { type: 'SET-TODOLISTS', todolists } as const
}

export const fetchTodolistsTC = (dispatch: AppDispatch) => {
	todolistsApi.getTodolists().then(res => {
		dispatch(setTodolistsAC(res.data))
	})
}

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
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
	| SetTodolistsActionType
