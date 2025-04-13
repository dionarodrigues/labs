import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {updateEntities, cleanUpEntities} from '@store/actions';

// Create an entity adapter to help manage normalized airline data
export const airlinesAdapter = createEntityAdapter();

// Generate the initial state using the adapter
const initialState = airlinesAdapter.getInitialState();

// Create the airlines slice
const airlinesSlice = createSlice({
	name: 'airlines', // Unique slice name
	initialState, // Initial normalized state
	reducers: {}, // No local reducers needed in this example

	// Use extraReducers to handle shared, cross-slice actions
	extraReducers: builder => {
		builder
			// When the updateEntities action is dispatched with a payload containing airline data,
			// the slice will replace the current state with the new set of airlines
			.addCase(updateEntities, (state, action) => {
				if (action.payload.airlines) {
					airlinesAdapter.setAll(state, action.payload.airlines);
				}
			})
			// When the cleanUpEntities action is dispatched (which doesn't need a payload),
			// the slice will remove all airlines from the state
			.addCase(cleanUpEntities, state => {
				airlinesAdapter.removeAll(state);
			});
	},
});

// Export the reducer to be used in the store
export default airlinesSlice.reducer;
