import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddItemForm } from '../components/AddItemForm'
import { Todolist } from '../components/Todolist'
import { MenuButton } from '../components/styledComponents/MenuButton'
import {
	addTaskAC,
	addTodolistAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
} from '../model/task-reducer'
import {
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
} from '../model/todolists-reducer'
import './App.css'
import { RootState } from './store'

type ThemeMode = 'dark' | 'light'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export const App = () => {
	const todolists = useSelector<RootState, TodolistType[]>(
		state => state.todolists
	)
	const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	const changeFilter = (filter: FilterValuesType, id: string) => {
		dispatch(changeTodolistFilterAC({ id, filter }))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({ title, todolistId }))
	}

	const removeTodolist = (todolistId: string) => {
		dispatch(removeTodolistAC(todolistId))
	}

	const changeTaskStatus = (
		taskId: string,
		isDone: boolean,
		todolistId: string
	) => {
		dispatch(changeTaskStatusAC({ taskId, isDone, todolistId }))
	}

	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC({ taskId, todolistId }))
	}

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(changeTaskTitleAC({ taskId, title, todolistId }))
	}

	const updateTodolist = (id: string, title: string) => {
		dispatch(changeTodolistTitleAC({ id, title }))
	}

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	})

	const changeModeHandler = () => {
		setThemeMode(themeMode === 'light' ? 'dark' : 'light')
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position='static' sx={{ mb: '30px' }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<IconButton color='inherit'>
						<MenuIcon />
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler} />
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{ mb: '30px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={4}>
					{todolists.map(tl => {
						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}
						return (
							<Grid key={tl.id}>
								<Paper sx={{ p: '0 20px 20px 20px' }}>
									<Todolist
										title={tl.title}
										todolistId={tl.id}
										tasks={tasksForTodolist}
										removeTodolist={removeTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										updateTodolist={updateTodolist}
										updateTask={updateTask}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										filter={tl.filter}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	)
}
