import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addTodo, toggleTodo, removeTodo, selectTodos} from '../../todoSlice';
import './styles.css'; // Import the CSS file

const TodoList = () => {
	const [input, setInput] = useState(''); // Local state for the input field
	const dispatch = useDispatch(); // Dispatch to trigger Redux actions
	const todos = useSelector(selectTodos); // Select todos from the Redux store

	// Handle adding a new todo
	const handleAddTodo = () => {
		// Check if input is not just whitespace
		if (input.trim()) {
			dispatch(addTodo(input.trim())); // Dispatch addTodo action
			setInput(''); // Reset input field after adding the todo
		}
	};

	// Handle toggling the completion status of a todo
	const handleToggleTodo = id => {
		dispatch(toggleTodo(id)); // Dispatch toggleTodo action to mark as completed or not
	};

	return (
		<div className="todo-container">
			<h1 className="todo-title">To-Do List</h1>

			{/* Input field and Add button */}
			<div className="input-container">
				<input
					type="text"
					value={input}
					onChange={e => setInput(e.target.value)} // Update input state on change
					className="todo-input"
					placeholder="Add a new task..."
				/>
				<button onClick={handleAddTodo} className="add-button">
					Add
				</button>
			</div>

			{/* List of todos */}
			<ul className="todo-list">
				{todos.map(todo => (
					<li
						key={todo.id}
						className={`todo-item ${todo.completed ? 'completed' : ''}`} // Add 'completed' class if the task is completed
					>
						{/* Checkbox to mark a task as completed or not */}
						<label style={{display: 'flex', alignItems: 'center'}}>
							<input
								type="checkbox"
								checked={todo.completed} // Checkbox checked state based on todo's completed status
								onChange={() => handleToggleTodo(todo.id)} // Handle checkbox toggle
								className="todo-checkbox"
							/>
							<span
								style={{
									textDecoration: todo.completed ? 'line-through' : 'none',
								}} // Strike-through text if completed
							>
								{todo.text}
							</span>
						</label>

						{/* Remove button to delete a todo */}
						<button
							onClick={() => dispatch(removeTodo(todo.id))} // Dispatch removeTodo action
							className="remove-button"
						>
							❌
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
