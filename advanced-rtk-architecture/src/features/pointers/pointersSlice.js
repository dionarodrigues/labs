import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {updateEntities, cleanUpEntities} from '@store/actions';

export const pointersAdapter = createEntityAdapter();
const initialState = pointersAdapter.getInitialState();

const pointerSlice = createSlice({
	name: 'pointers',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(updateEntities, (state, action) => {
				if (action.payload.pointers) {
					pointersAdapter.setOne(state, action.payload.pointers);
				}
			})
			.addCase(cleanUpEntities, state => {
				pointersAdapter.removeAll(state);
			});
	},
});

export default pointerSlice.reducer;
