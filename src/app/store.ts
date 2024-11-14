import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from 'features/auth/model/authSlice'
import { tasksReducer, tasksSlice } from '../features/todolists/model/taskSlice'
import {
	todolistsReducer,
	todolistsSlice,
} from '../features/todolists/model/todolistsSlice'
import { appReducer, appSlice } from './appSlice'

export const store = configureStore({
	reducer: {
		[tasksSlice.name]: tasksReducer,
		[todolistsSlice.name]: todolistsReducer,
		[appSlice.name]: appReducer,
		[authSlice.name]: authReducer,
	},
})
// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
