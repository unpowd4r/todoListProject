import { Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { fetchTodolistsTC } from 'features/todolists/model/todolists-reducer'
import { useEffect } from 'react'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { selectTodolists } from '../../model/todolistsSelectors'
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
							<Todolist todolist={tl} />
						</Paper>
					</Grid>
				)
			})}
		</>
	)
}
