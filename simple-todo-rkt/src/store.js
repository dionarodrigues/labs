import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

// Note: The `name` of the slice (in this case, `todos`) will appear in the Redux DevTools tree.
export const store = configureStore({
	reducer: {
		todos: todoReducer,
	},
});
