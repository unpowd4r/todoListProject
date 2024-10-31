import { TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'

type Props = {
	value: string
	onChange: (newTitle: string) => void
	disabled?: boolean
}

export const EditableSpan = ({ value, onChange, disabled }: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(value)

	const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const activateEditModeHandler = () => {
		if (disabled === false) setEditMode(true)
	}

	const deactivateEditModeHandler = () => {
		setEditMode(false)
		onChange(title)
	}

	return (
		<>
			{editMode ? (
				<TextField
					variant={'outlined'}
					value={title}
					size={'small'}
					onChange={changeTitleHandler}
					onBlur={deactivateEditModeHandler}
					autoFocus
				/>
			) : (
				<span onDoubleClick={activateEditModeHandler}>{value}</span>
			)}
		</>
	)
}
