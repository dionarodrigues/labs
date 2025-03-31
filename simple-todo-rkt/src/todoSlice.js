import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';

// Create an adapter for the to-do list
const todosAdapter = createEntityAdapter();

// Define the initial state using the adapter's getInitialState
const initialState = todosAdapter.getInitialState();

const todoSlice = createSlice({
	name: 'todos', // The slice name will appear in Redux DevTools
	initialState,
	reducers: {
		// Adds a new to-do using the adapter's addOne function
		addTodo: (state, action) => {
			todosAdapter.addOne(state, {
				id: Date.now(), // Generate a unique ID based on timestamp
				text: action.payload, // The text of the to-do
				completed: false, // Default to not completed
			});
		},

		// Toggles the completion status of a to-do item
		toggleTodo: (state, action) => {
			const todo = state.entities[action.payload]; // Access by ID
			if (todo) {
				todo.completed = !todo.completed; // Toggle completed status
			}
		},

		// Removes a to-do using the adapter's removeOne function
		removeTodo: (state, action) => {
			todosAdapter.removeOne(state, action.payload);
		},
	},
});

// Export actions
export const {addTodo, toggleTodo, removeTodo} = todoSlice.actions;

// Generate selectors using the adapter
export const {selectAll: selectTodos, selectById: selectTodoById} =
	todosAdapter.getSelectors(state => state.todos);

// Export the reducer for the store setup
export default todoSlice.reducer;
