import { setAppStatusAC } from 'app/app-reducer'
import { AppDispatch, RootState } from 'app/store'
import { ResultCode, TaskPriority, TaskStatus } from 'common/enums/enums'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'
import { TasksStateType } from '../../../app/App'
import { tasksApi } from '../api/taskApi'
import { DomainTask, UpdateTaskModel } from '../api/tasksApi.types'

const initialState: TasksStateType = {}

export type UpdateTaskDomainModel = {
	title?: string
	description?: string
	status?: TaskStatus
	priority?: TaskPriority
	startDate?: string
	deadline?: string
}

export const tasksReducer = (
	state: TasksStateType = initialState,
	action: ActionsType
): TasksStateType => {
	switch (action.type) {
		case 'SET-TASKS': {
			const stateCopy = { ...state }
			stateCopy[action.payload.todolistId] = action.payload.tasks
			return stateCopy
		}

		case 'REMOVE-TASK': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter(
					t => t.id !== action.payload.taskId
				),
			}
		}

		case 'ADD-TASK': {
			const newTask = action.payload.task

			return {
				...state,
				[newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
			}
		}
		case 'UPDATE-TASK': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(t =>
					t.id === action.payload.taskId
						? {
								...t,
								...action.payload.domainModel,
							}
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

		case 'REMOVE-TODOLIST': {
			const newState = { ...state }
			delete newState[action.payload.id]
			return newState
		}

		default:
			return state
	}
}

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
	dispatch(setAppStatusAC('loading'))
	tasksApi
		.getTasks(todolistId)
		.then(res => {
			dispatch(setAppStatusAC('succeeded'))
			dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
}

export const removeTaskTC =
	(arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
		dispatch(setAppStatusAC('loading'))
		tasksApi
			.deleteTask(arg)
			.then(res => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatusAC('succeeded'))
					dispatch(removeTaskAC(arg))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch(error => {
				handleServerNetworkError(error, dispatch)
			})
	}

export const addTaskTC =
	(arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
		dispatch(setAppStatusAC('loading'))
		tasksApi
			.createTask(arg)
			.then(res => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(addTaskAC({ task: res.data.data.item }))
					dispatch(setAppStatusAC('succeeded'))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch(error => {
				handleServerNetworkError(error, dispatch)
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
		const task = tasksForCurrentTodolist.find(t => t.id === taskId)

		if (task) {
			const updatedTaskModel: UpdateTaskModel = {
				title: domainModel.title ?? task.title,
				description: domainModel.description ?? task.description,
				status: domainModel.status ?? task.status,
				priority: domainModel.priority ?? task.priority,
				startDate: domainModel.startDate ?? task.startDate,
				deadline: domainModel.deadline ?? task.deadline,
			}
			dispatch(setAppStatusAC('loading'))

			tasksApi
				.updateTask({ taskId, todolistId, model: updatedTaskModel })
				.then(res => {
					if (res.data.resultCode === ResultCode.Success) {
						dispatch(setAppStatusAC('succeeded'))
						dispatch(updateTaskAC(arg))
					} else {
						handleServerAppError(res.data, dispatch)
					}
				})
				.catch(error => {
					handleServerNetworkError(error, dispatch)
				})
		}
	}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTasksActionType
	| UpdateTaskActionType

export const removeTaskAC = (payload: {
	taskId: string
	todolistId: string
}) => {
	return {
		type: 'REMOVE-TASK',
		payload,
	} as const
}

export const addTodolistAC = (title: string) => {
	const newTodolistId = v1()
	return {
		type: 'ADD-TODOLIST',
		payload: { title, todolistId: newTodolistId },
	} as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
	return {
		type: 'ADD-TASK',
		payload,
	} as const
}

export const updateTaskAC = (payload: {
	taskId: string
	todolistId: string
	domainModel: Partial<UpdateTaskDomainModel>
}) => {
	return {
		type: 'UPDATE-TASK',
		payload,
	} as const
}

export const removeTodolistAC = (todolistId: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		payload: { id: todolistId },
	} as const
}

export const setTasksAC = (payload: {
	todolistId: string
	tasks: DomainTask[]
}) => {
	return {
		type: 'SET-TASKS',
		payload,
	} as const
}
