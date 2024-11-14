import { BaseResponse } from 'common/types'
import { Dispatch } from 'redux'
import { setAppError, setAppStatus } from '../../app/appSlice'

export const handleServerAppError = <T>(
	data: BaseResponse<T>,
	dispatch: Dispatch
) => {
	if (data.messages.length) {
		dispatch(setAppError({ status: data.messages[0] }))
	} else {
		dispatch(setAppError({ status: 'Some error occurred' }))
	}
	dispatch(setAppStatus({ status: 'failed' }))
}
