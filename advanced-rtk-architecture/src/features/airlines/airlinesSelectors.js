import {createSelector} from '@reduxjs/toolkit';
import {airlinesAdapter} from './airlinesSlice';

const {selectById: selectAirlinesById} = airlinesAdapter.getSelectors(
	state => state.airlines
);

export const selectAirline = (state, airlineId) =>
	selectAirlinesById(state, airlineId);

export const selectAirlineName = createSelector(
	[selectAirline],
	airline => airline?.name
);

export const selectAirlineFoundation = createSelector(
	[selectAirline],
	airline => airline?.foundation
);
