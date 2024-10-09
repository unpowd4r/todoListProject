import { Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { selectTodolists } from '../../model/todolistsSelectors'
import { Todolist } from './Todolist/Todolist'

export const Todolists = () => {
	const todolists = useAppSelector(selectTodolists)

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
