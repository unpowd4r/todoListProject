import AddBoxIcon from '@mui/icons-material/AddBox'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type Props = {
	addItem: (title: string) => void
	disabled?: boolean
}

export const AddItemForm = ({ addItem, disabled }: Props) => {
	const [title, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addItemHandler()
		}
	}
	return (
		<div>
			<TextField
				label='Enter a title'
				variant={'outlined'}
				value={title}
				size={'small'}
				error={!!error}
				helperText={error}
				onChange={changeItemTitleHandler}
				onKeyUp={addItemOnKeyUpHandler}
				disabled={disabled}
			/>
			<IconButton
				onClick={addItemHandler}
				color={'primary'}
				disabled={disabled}
			>
				<AddBoxIcon />
			</IconButton>
		</div>
	)
}
