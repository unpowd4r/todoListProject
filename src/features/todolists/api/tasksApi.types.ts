import { TaskPriority, TaskStatus } from '../../../common/enums/enums'

export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: DomainTask[]
}

export type DomainTask = {
	id: string
	title: string
	description?: any
	todoListId: string
	order: number
	status: TaskStatus
	priority: TaskPriority
	startDate?: any
	deadline?: any
	addedDate: string
}

export type UpdateTaskModel = {
	status: TaskStatus
	title: string
	deadline: string
	description: string
	priority: TaskPriority
	startDate: number
}
