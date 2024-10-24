import { AppDispatch, RootState } from 'app/store'
import { TaskStatus } from 'common/enums/enums'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'
import { TasksStateType } from '../../../app/App'
import { tasksApi } from '../api/taskApi'
import { DomainTask, UpdateTaskModel } from '../api/tasksApi.types'

const initialState: TasksStateType = {}

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
		case 'CHANGE-TASK': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(t =>
					t.id === action.payload.taskId
						? {
								...t,
								status: action.payload.status,
							}
						: t
				),
			}
		}

		case 'CHANGE-TASK-TITLE': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(t =>
					t.id === action.payload.taskId
						? {
								...t,
								title: action.payload.title,
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

export const fetchTasksTC = (todolistId: string) => {
	return (dispatch: AppDispatch) => {
		tasksApi.getTasks(todolistId).then(res => {
			dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
		})
	}
}

export const removeTaskTC =
	(arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
		tasksApi.deleteTask(arg).then(res => {
			dispatch(removeTaskAC(arg))
		})
	}

export const addTaskTC =
	(arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
		tasksApi.createTask(arg).then(res => {
			dispatch(addTaskAC({ task: res.data.data.item }))
		})
	}

export const changeTaskStatusTC =
	(arg: { taskId: string; status: TaskStatus; todolistId: string }) =>
	(dispatch: Dispatch, getState: () => RootState) => {
		const { taskId, todolistId, status } = arg

		const allTasksFromState = getState().tasks
		const tasksForCurrentTodolist = allTasksFromState[todolistId]
		const task = tasksForCurrentTodolist.find(t => t.id === taskId)

		if (task) {
			const model: UpdateTaskModel = {
				status,
				title: task.title,
				deadline: task.deadline,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
			}

			tasksApi.updateTaskStatus({ taskId, todolistId, model }).then(res => {
				dispatch(changeTaskStatusAC(arg))
			})
		}
	}

export const changeTaskTitleTC =
	(arg: { taskId: string; title: string; todolistId: string }) =>
	(dispatch: Dispatch, getState: () => RootState) => {
		const { taskId, todolistId, title } = arg

		const allTasksFromState = getState().tasks
		const tasksForCurrentTodolist = allTasksFromState[todolistId]
		const task = tasksForCurrentTodolist.find(t => t.id === taskId)

		if (task) {
			const model: UpdateTaskModel = {
				status: task.status,
				title,
				deadline: task.deadline,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
			}

			tasksApi.updateTaskTitle({ taskId, todolistId, model }).then(res => {
				dispatch(changeTaskTitleAC(arg))
			})
		}
	}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTasksActionType

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

export const changeTaskStatusAC = (payload: {
	taskId: string
	status: TaskStatus
	todolistId: string
}) => {
	return {
		type: 'CHANGE-TASK',
		payload,
	} as const
}

export const changeTaskTitleAC = (payload: {
	taskId: string
	title: string
	todolistId: string
}) => {
	return {
		type: 'CHANGE-TASK-TITLE',
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
