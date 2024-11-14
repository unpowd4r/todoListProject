import { DomainTodolist } from 'features/todolists/model/todolistsSlice'
import { AddItemForm } from '../../../../../common/components/AddItemForm/AddItemForm'
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch'
import { addTaskTC } from '../../../model/taskSlice'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'

type TodoPropsType = {
	todolist: DomainTodolist
}

export const Todolist = ({ todolist }: TodoPropsType) => {
	const dispatch = useAppDispatch()

	const addTaskCallback = (title: string) => {
		dispatch(addTaskTC({ title, todolistId: todolist.id }))
	}

	return (
		<div>
			<TodolistTitle todolist={todolist} />
			<AddItemForm
				addItem={addTaskCallback}
				disabled={todolist.entityStatus === 'loading'}
			/>
			<Tasks todolist={todolist} />
			<FilterTasksButtons todolist={todolist} />
		</div>
	)
}
