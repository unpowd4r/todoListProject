import { TaskType } from '../App'
import { Button } from './Buttons'

type TodoPropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: number) => void
}

export const Todolist = ({ title, tasks, removeTask }: TodoPropsType) => {
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input />
				<Button title={'+'} />
			</div>
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map(task => {
						return (
							<li key={task.id}>
								<input type='checkbox' checked={task.isDone} />
								<span>{task.title}</span>
								<Button title={'x'} onClick={() => removeTask(task.id)} />
							</li>
						)
					})}
				</ul>
			)}
			<div>
				<Button title={'All'} />
				<Button title={'Active'} />
				<Button title={'Completed'} />
			</div>
		</div>
	)
}
