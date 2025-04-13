import {createSelector} from '@reduxjs/toolkit';
import {airlinesAdapter} from './airlinesSlice';

// Get the default selector from the airlines slice
const {selectById: selectAirlinesById} = airlinesAdapter.getSelectors(
	state => state.airlines
);

// Create a selector to retrieve an airline by its ID
export const selectAirline = (state, airlineId) =>
	selectAirlinesById(state, airlineId);

// Use createSelector to transform the data (e.g., extracting the name of the airline)
export const selectAirlineName = createSelector(
	[selectAirline],
	airline => airline?.name
);

// Use createSelector to transform the data (e.g., extracting the foundation of the airline)
export const selectAirlineFoundation = createSelector(
	[selectAirline],
	airline => airline?.foundation
);
