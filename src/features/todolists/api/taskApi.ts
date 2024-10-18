import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types'
import { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'

export const tasksApi = {
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
	},
	createTask(payload: { title: string; todolistId: string }) {
		const { title, todolistId } = payload
		return instance.post<BaseResponse<{ item: DomainTask }>>(
			`todo-lists/${todolistId}/tasks`,
			{ title }
		)
	},
	deleteTask(payload: { todolistId: string; taskId: string }) {
		const { todolistId, taskId } = payload
		return instance.delete<BaseResponse<{ item: DomainTask }>>(
			`todo-lists/${todolistId}/tasks/${taskId}`
		)
	},
	updateTaskStatus(payload: {
		todolistId: string
		taskId: string
		model: UpdateTaskModel
	}) {
		const { todolistId, taskId, model } = payload
		return instance.put<BaseResponse<{ item: DomainTask }>>(
			`todo-lists/${todolistId}/tasks/${taskId}`,
			model
		)
	},
	updateTaskTitle(payload: {
		todolistId: string
		taskId: string
		model: UpdateTaskModel
	}) {
		const { todolistId, taskId, model } = payload
		return instance.put<BaseResponse<{ item: DomainTask }>>(
			`todo-lists/${todolistId}/tasks/${taskId}`,
			model
		)
	},
}
