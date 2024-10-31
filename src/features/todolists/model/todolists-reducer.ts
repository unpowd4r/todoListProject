import { RequestStatus, setAppStatusAC } from 'app/app-reducer'
import { ResultCode } from 'common/enums/enums'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { Dispatch } from 'redux'
import { todolistsApi } from '../api/todolistsApi'
import { Todolist } from '../api/todolistsApi.types'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
	filter: FilterValuesType
	entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
	state: DomainTodolist[] = initialState,
	action: ActionType
): DomainTodolist[] => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			return action.todolists.map(tl => ({
				...tl,
				filter: 'all',
				entityStatus: 'idle',
			}))
		}

		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.payload.id)
		}
		case 'ADD-TODOLIST': {
			const newTodolist: DomainTodolist = {
				...action.payload,
				filter: 'all',
				entityStatus: 'idle', // добавляем поле filter по умолчанию
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

		case 'CHANGE-TODOLIST-ENTITY-STATUS': {
			return state.map(tl => {
				return tl.id === action.payload.id
					? { ...tl, entityStatus: action.payload.entityStatus }
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

export const addTodolistAC = (todolistId: Todolist) => {
	return { type: 'ADD-TODOLIST', payload: todolistId } as const
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

export const changeTodolistEntityStatusAC = (payload: {
	id: string
	entityStatus: RequestStatus
}) => {
	return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload } as const
}

export const fetchTodolistsTC = (dispatch: Dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsApi
		.getTodolists()
		.then(res => {
			dispatch(setAppStatusAC('succeeded'))
			dispatch(setTodolistsAC(res.data))
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsApi
		.createTodolist(title)
		.then(res => {
			const newTodolist = res.data.data.item
			dispatch(setAppStatusAC('succeeded'))
			dispatch(addTodolistAC(newTodolist))
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC('loading'))
	dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'loading' }))
	todolistsApi
		.removeTodolist(id)
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatusAC('succeeded'))
				dispatch(removeTodolistAC(id))
			} else {
				handleServerAppError(res.data, dispatch)
				dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'idle' }))
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
			dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'idle' }))
		})
}

export const updateTodolistTitleTC =
	(arg: { id: string; title: string }) => (dispatch: Dispatch) => {
		dispatch(setAppStatusAC('loading'))
		const { id, title } = arg
		todolistsApi
			.updateTodolist({ id, title })
			.then(res => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatusAC('succeeded'))
					dispatch(changeTodolistTitleAC({ id, title }))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch(error => {
				handleServerNetworkError(error, dispatch)
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
export type ChangeTodolistEntityStatusActionType = ReturnType<
	typeof changeTodolistEntityStatusAC
>

type ActionType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType
	| SetTodolistsActionType
	| ChangeTodolistEntityStatusActionType
