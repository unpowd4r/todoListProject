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
import { v1 } from 'uuid'
import './App.css'
import { AddItemForm } from './components/AddItemForm'
import { Todolist } from './components/Todolist'
import { MenuButton } from './components/styledComponents/MenuButton'

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
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'GraphQL', isDone: true },
			{ id: v1(), title: 'Rest API', isDone: false },
		],
	})

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		setTodolists(
			todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl))
		)
	}

	const addTask = (title: string, todolistId: string) => {
		const newTask = {
			id: v1(),
			title,
			isDone: false,
		}
		const todolistTasks = tasks[todolistId]
		tasks[todolistId] = [newTask, ...todolistTasks]
		setTasks({ ...tasks })
	}

	const removeTodolist = (todolistId: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todolistId))

		delete tasks[todolistId]

		setTasks({ ...tasks })
	}

	const changeTaskStatus = (
		taskId: string,
		taskStatus: boolean,
		todolistId: string
	) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t =>
				t.id === taskId ? { ...t, isDone: taskStatus } : t
			),
		}
		setTasks(newTodolistTasks)
	}

	const removeTask = (taskId: string, todolistId: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
		}
		setTasks(newTodolistTasks)
	}

	const addTodolist = (title: string) => {
		const todolistId = v1()
		const newTodolist: TodolistType = {
			id: todolistId,
			title: title,
			filter: 'all',
		}
		setTodolists([newTodolist, ...todolists])
		setTasks({ ...tasks, [todolistId]: [] })
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t =>
				t.id === taskId ? { ...t, title } : t
			),
		}
		setTasks(newTodolistTasks)
	}

	const updateTodolist = (todolistId: string, title: string) => {
		const newTodolists = todolists.map(tl =>
			tl.id === todolistId ? { ...tl, title } : tl
		)
		setTodolists(newTodolists)
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
							<Grid>
								<Paper sx={{ p: '0 20px 20px 20px' }}>
									<Todolist
										key={tl.id}
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
