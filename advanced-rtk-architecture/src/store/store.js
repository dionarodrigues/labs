import {configureStore} from '@reduxjs/toolkit';

import airlinesReducer from '@features/airlines/airlinesSlice';
import countriesReducer from '@features/countries/countriesSlice';
import pointersReducer from '@features/pointers/pointersSlice';

export const store = configureStore({
	reducer: {
		airlines: airlinesReducer,
		countries: countriesReducer,
		pointers: pointersReducer,
	},
});
