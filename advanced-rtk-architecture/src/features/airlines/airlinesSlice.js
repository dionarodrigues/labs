import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {updateEntities, cleanUpEntities} from '@store/actions';

export const airlinesAdapter = createEntityAdapter();
const initialState = airlinesAdapter.getInitialState();

const airlinesSlice = createSlice({
	name: 'airlines',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(updateEntities, (state, action) => {
				if (action.payload.airlines) {
					airlinesAdapter.setAll(state, action.payload.airlines);
				}
			})
			.addCase(cleanUpEntities, state => {
				airlinesAdapter.removeAll(state);
			});
	},
});

export default airlinesSlice.reducer;
