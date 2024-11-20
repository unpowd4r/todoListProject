import { createSlice } from '@reduxjs/toolkit'
import { RequestStatus, setAppStatus } from 'app/appSlice'
import { ResultCode } from 'common/enums/enums'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { Dispatch } from 'redux'
import { _todolistsApi } from '../api/todolistsApi'
import { Todolist } from '../api/todolistsApi.types'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
	filter: FilterValuesType
	entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
	name: 'todolists',
	initialState: [] as DomainTodolist[],
	reducers: create => ({
		removeTodolist: create.reducer<{ id: string }>((state, action) => {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			if (index !== -1) {
				state.splice(index, 1)
			}
		}),
		addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
			const newTodolist: DomainTodolist = {
				...action.payload.todolist,
				filter: 'all',
				entityStatus: 'idle',
			}
			state.unshift(newTodolist)
		}),
		changeTodolistTitle: create.reducer<{ id: string; title: string }>(
			(state, action) => {
				const index = state.findIndex(tl => tl.id === action.payload.id)
				if (index !== -1) {
					state[index].title = action.payload.title
				}
			}
		),
		changeTodolistFilter: create.reducer<{
			id: string
			filter: FilterValuesType
		}>((state, action) => {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			if (index !== -1) {
				state[index].filter = action.payload.filter
			}
		}),
		changeTodolistEntityStatus: create.reducer<{
			id: string
			entityStatus: RequestStatus
		}>((state, action) => {
			const todolist = state.find(tl => tl.id === action.payload.id)
			if (todolist) {
				todolist.entityStatus = action.payload.entityStatus
			}
		}),
		setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
			action.payload.todolists.forEach(tl =>
				state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
			)
		}),
		clearTodolists: create.reducer(() => {
			return []
		}),
	}),
	selectors: {
		selectTodolists: state => state,
	},
})

export const { selectTodolists } = todolistsSlice.selectors
export const {
	removeTodolist,
	addTodolist,
	changeTodolistEntityStatus,
	changeTodolistTitle,
	clearTodolists,
	setTodolists,
	changeTodolistFilter,
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const fetchTodolistsTC = (dispatch: Dispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	_todolistsApi
		.getTodolists()
		.then(res => {
			dispatch(setAppStatus({ status: 'succeeded' }))
			dispatch(setTodolists({ todolists: res.data }))
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	_todolistsApi
		.createTodolist(title)
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: 'succeeded' }))
				dispatch(addTodolist({ todolist: res.data.data.item }))
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	dispatch(changeTodolistEntityStatus({ id, entityStatus: 'loading' }))
	_todolistsApi
		.removeTodolist(id)
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: 'succeeded' }))
				dispatch(removeTodolist({ id }))
			} else {
				handleServerAppError(res.data, dispatch)
				dispatch(changeTodolistEntityStatus({ id, entityStatus: 'idle' }))
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
			dispatch(changeTodolistEntityStatus({ id, entityStatus: 'failed' }))
		})
}

export const updateTodolistTitleTC =
	(arg: { id: string; title: string }) => (dispatch: Dispatch) => {
		dispatch(setAppStatus({ status: 'loading' }))
		const { id, title } = arg
		_todolistsApi
			.updateTodolist({ id, title })
			.then(res => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))
					dispatch(changeTodolistTitle({ id, title }))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch(error => {
				handleServerNetworkError(error, dispatch)
			})
	}
