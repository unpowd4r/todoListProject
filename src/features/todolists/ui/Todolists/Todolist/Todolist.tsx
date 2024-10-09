import { FilterValuesType } from '../../../../../app/App'
import { AddItemForm } from '../../../../../common/components/AddItemForm/AddItemForm'
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch'
import { addTaskAC } from '../../../model/task-reducer'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'

type TodolistInfoType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TodoPropsType = {
	todolist: TodolistInfoType
}

export const Todolist = ({ todolist }: TodoPropsType) => {
	const dispatch = useAppDispatch()

	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC({ title, todolistId: todolist.id }))
	}

	return (
		<div>
			<TodolistTitle todolist={todolist} />
			<AddItemForm addItem={addTaskCallback} />
			<Tasks todolist={todolist} />
			<FilterTasksButtons todolist={todolist} />
		</div>
	)
}
