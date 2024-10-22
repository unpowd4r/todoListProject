import {
	applyMiddleware,
	combineReducers,
	legacy_createStore,
	UnknownAction,
} from 'redux'
import { thunk, ThunkDispatch } from 'redux-thunk'
import { tasksReducer } from '../features/todolists/model/task-reducer'
import { todolistsReducer } from '../features/todolists/model/todolists-reducer'
import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
})
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
