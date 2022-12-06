import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from './config';

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const response = await fetch(`${API}/todos`);
		if (response.ok) {
			const todos = await response.json();
			return {todos};
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async payload => {
		const {title} = payload;
		const response = await fetch(`${API}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({title}),
		});

		if (response.ok) {
			const todo = await response.json();
			return {todo};
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async payload => {
		const {id} = payload;
		const response = await fetch(`${API}/todos/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			const todos = await response.json();
			return {todos};
		}
	}
);

export const toggleCompleteAsync = createAsyncThunk(
	'todos/toggleCompleteAsync',
	async payload => {
		const {id, completed} = payload;
		const response = await fetch(`${API}/todos/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({completed}),
		});

		if (response.ok) {
			const {id, completed} = await response.json();
			return {id, completed};
		}
	}
);

const todoSlice = createSlice({
	name: 'todo',
	initialState: [
		{id: 1, title: 'Todo title 01', completed: false},
		{id: 2, title: 'Todo title 02', completed: false},
		{id: 3, title: 'Todo title 03', completed: true},
	],
	reducers: {
		addTodo: (state, action) => {
			const {title} = action.payload;
			const newTodo = {
				id: Date.now(),
				title,
				completed: false,
			};
			state.push(newTodo);
		},
		toggleComplete: (state, action) => {
			const {id} = action.payload;
			const index = state.findIndex(item => item.id === id);
			state[index].completed = action.payload.completed;
		},
		deleteTodo: (state, action) => {
			const {id} = action.payload;
			return state.filter(item => item.id !== id);
		},
	},
	extraReducers: {
		[getTodosAsync.fulfilled]: (state, action) => action.payload.todos,
		[addTodoAsync.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const {id} = action.payload;
			const index = state.findIndex(item => item.id === id);
			state[index].completed = action.payload.completed;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => action.payload.todos,
	},
});

export const {addTodo, toggleComplete, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
