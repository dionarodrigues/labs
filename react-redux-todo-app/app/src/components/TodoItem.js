import {useDispatch} from 'react-redux';
import {toggleCompleteAsync, deleteTodoAsync} from '../redux/todoSlice';

const TodoItem = ({id, title, completed}) => {
	const dispatch = useDispatch();

	const handleToggleComplete = () => {
		dispatch(
			toggleCompleteAsync({
				id,
				completed: !completed,
			})
		);
	};

	const handleDelete = () => {
		dispatch(deleteTodoAsync({id}));
	};

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className="d-flex justify-content-between">
				<span className="d-flex align-items-center">
					<input
						type="checkbox"
						checked={completed}
						onChange={handleToggleComplete}
					></input>
					<span className="ms-2 d-block ">{title}</span>
				</span>
				<button className="btn btn-outline-danger" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
