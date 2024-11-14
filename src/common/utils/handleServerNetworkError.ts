import { Dispatch } from 'redux'
import { setAppError, setAppStatus } from '../../app/appSlice'

export const handleServerNetworkError = (
	error: { message: string },
	dispatch: Dispatch
) => {
	dispatch(setAppError({ status: error.message }))
	dispatch(setAppStatus({ status: 'failed' }))
}
