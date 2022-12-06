import {useSelector} from 'react-redux';

const TotalCompleteItems = () => {
	const completedTodos = useSelector(state =>
		state.todos.filter(item => item.completed === true)
	);

	return (
		<p className="text-dark mt-3">
			Total Complete Items: {completedTodos.length}
		</p>
	);
};

export default TotalCompleteItems;
