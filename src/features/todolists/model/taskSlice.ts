import { createSlice } from '@reduxjs/toolkit'
import { setAppStatus } from 'app/appSlice'
import { AppDispatch, RootState } from 'app/store'
import { ResultCode, TaskPriority, TaskStatus } from 'common/enums/enums'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { Dispatch } from 'redux'
import { TasksStateType } from '../../../app/App'
import { tasksApi } from '../api/taskApi'
import { DomainTask, UpdateTaskModel } from '../api/tasksApi.types'
import { addTodolist, removeTodolist } from './todolistsSlice'

export type UpdateTaskDomainModel = {
	title?: string
	description?: string
	status?: TaskStatus
	priority?: TaskPriority
	startDate?: string
	deadline?: string
}

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {} as TasksStateType,
	reducers: create => ({
		setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>(
			(state, action) => {
				state[action.payload.todolistId] = action.payload.tasks
			}
		),
		removeTask: create.reducer<{ taskId: string; todolistId: string }>(
			(state, action) => {
				const tasks = state[action.payload.todolistId]
				const index = tasks.findIndex(t => t.id === action.payload.taskId)

				if (index !== -1) {
					tasks.splice(index, 1)
				}
			}
		),
		addTask: create.reducer<{ task: DomainTask }>((state, action) => {
			const tasks = state[action.payload.task.todoListId]
			tasks.unshift(action.payload.task)
		}),
		updateTask: create.reducer<{
			taskId: string
			todolistId: string
			domainModel: UpdateTaskDomainModel
		}>((state, action) => {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(
				(t: DomainTask) => t.id === action.payload.taskId
			)
			if (index !== -1) {
				tasks[index] = { ...tasks[index], ...action.payload.domainModel }
			}
		}),
		clearTasks: create.reducer(() => {
			return {}
		}),
	}),
	extraReducers: builder => {
		builder
			.addCase(addTodolist, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(removeTodolist, (state, action) => {
				delete state[action.payload.id]
			})
	},
})

export const { addTask, clearTasks, removeTask, setTasks, updateTask } =
	tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	tasksApi
		.getTasks(todolistId)
		.then(res => {
			dispatch(setAppStatus({ status: 'succeeded' }))
			dispatch(setTasks({ tasks: res.data.items, todolistId }))
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
			dispatch(setAppStatus({ status: 'failed' }))
		})
}

export const removeTaskTC =
	(arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
		dispatch(setAppStatus({ status: 'loading' }))
		tasksApi
			.deleteTask(arg)
			.then(res => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))
					dispatch(removeTask(arg))
				} else {
					handleServerAppError(res.data, dispatch)
					dispatch(setAppStatus({ status: 'failed' }))
				}
			})
			.catch(error => {
				handleServerNetworkError(error, dispatch)
				dispatch(setAppStatus({ status: 'failed' }))
			})
	}

export const addTaskTC =
	(arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
		dispatch(setAppStatus({ status: 'loading' }))
		tasksApi
			.createTask(arg)
			.then(res => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(addTask({ task: res.data.data.item }))
					dispatch(setAppStatus({ status: 'succeeded' }))
				} else {
					handleServerAppError(res.data, dispatch)
					dispatch(setAppStatus({ status: 'failed' }))
				}
			})
			.catch(error => {
				handleServerNetworkError(error, dispatch)
				dispatch(setAppStatus({ status: 'failed' }))
			})
	}

export const updateTaskTC =
	(arg: {
		taskId: string
		todolistId: string
		domainModel: UpdateTaskDomainModel
	}) =>
	(dispatch: Dispatch, getState: () => RootState) => {
		const { taskId, todolistId, domainModel } = arg
		const allTasksFromState = getState().tasks
		const tasksForCurrentTodolist = allTasksFromState[todolistId]
		const task = tasksForCurrentTodolist.find(
			(t: DomainTask) => t.id === taskId
		)

		if (task) {
			const updatedTaskModel: UpdateTaskModel = {
				title: domainModel.title ?? task.title,
				description: domainModel.description ?? task.description,
				status: domainModel.status ?? task.status,
				priority: domainModel.priority ?? task.priority,
				startDate: domainModel.startDate ?? task.startDate,
				deadline: domainModel.deadline ?? task.deadline,
			}
			dispatch(setAppStatus({ status: 'loading' }))

			tasksApi
				.updateTask({ taskId, todolistId, model: updatedTaskModel })
				.then(res => {
					if (res.data.resultCode === ResultCode.Success) {
						dispatch(setAppStatus({ status: 'succeeded' }))
						dispatch(updateTask(arg))
					} else {
						handleServerAppError(res.data, dispatch)
						dispatch(setAppStatus({ status: 'failed' }))
					}
				})
				.catch(error => {
					handleServerNetworkError(error, dispatch)
					dispatch(setAppStatus({ status: 'failed' }))
				})
		}
	}
