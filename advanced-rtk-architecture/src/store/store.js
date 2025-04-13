import {configureStore} from '@reduxjs/toolkit';

// Import slice reducers
import airlinesReducer from '@features/airlines/airlinesSlice';
import countriesReducer from '@features/countries/countriesSlice';
import pointersReducer from '@features/pointers/pointersSlice';

// Create and configure the Redux store
export const store = configureStore({
	reducer: {
		// Each slice manages its own section of the state
		airlines: airlinesReducer,
		countries: countriesReducer,
		pointers: pointersReducer,
	},
});
