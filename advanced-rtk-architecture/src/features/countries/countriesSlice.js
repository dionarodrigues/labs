import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {updateEntities, cleanUpEntities} from '@store/actions';

export const countriesAdapter = createEntityAdapter();
const initialState = countriesAdapter.getInitialState();

const countriesSlice = createSlice({
	name: 'countries',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(updateEntities, (state, action) => {
				if (action.payload.countries) {
					countriesAdapter.setAll(state, action.payload.countries);
				}
			})
			.addCase(cleanUpEntities, state => {
				countriesAdapter.removeAll(state);
			});
	},
});

export default countriesSlice.reducer;
