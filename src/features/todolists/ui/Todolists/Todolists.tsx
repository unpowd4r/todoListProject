import { Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import {
	fetchTodolistsTC,
	selectTodolists,
} from 'features/todolists/model/todolistsSlice'
import { useEffect } from 'react'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { Todolist } from './Todolist/Todolist'

export const Todolists = () => {
	const todolists = useAppSelector(selectTodolists)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTodolistsTC)
	}, [])

	return (
		<>
			{todolists.map(tl => {
				return (
					<Grid key={tl.id}>
						<Paper sx={{ p: '0 20px 20px 20px' }}>
							<Todolist key={tl.id} todolist={tl} />
						</Paper>
					</Grid>
				)
			})}
		</>
	)
}
