import { TasksStateType } from '../../../app/App'
import { RootState } from '../../../app/store'

export const selectTasks = (state: RootState): TasksStateType => state.tasks
