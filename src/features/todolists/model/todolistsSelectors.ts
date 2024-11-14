import { RootState } from '../../../app/store'
import { DomainTodolist } from './todolistsSlice'

export const selectTodolists = (state: RootState): DomainTodolist[] =>
	state.todolists
