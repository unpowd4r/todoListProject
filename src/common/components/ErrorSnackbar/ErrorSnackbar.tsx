import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { clearAppErrorAC } from 'app/app-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { SyntheticEvent } from 'react'

export const ErrorSnackbar = () => {
	const dispatch = useAppDispatch()
	const error = useAppSelector(state => state.app.error)

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(clearAppErrorAC())
	}

	return (
		<Snackbar
			open={error !== null}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				severity='error'
				variant='filled'
				sx={{ width: '100%' }}
			>
				{error}
			</Alert>
		</Snackbar>
	)
}
