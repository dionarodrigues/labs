import {createSelector} from '@reduxjs/toolkit';
import {pointersAdapter} from './pointersSlice';
import {selectAirlineName} from '@features/airlines/airlinesSelectors';

// Get the basic selector from pointersSlice
const {selectById: selectPointerById} = pointersAdapter.getSelectors(
	state => state.pointers
);

// Select pointers based on the region (pointersId)
export const selectPointers = (state, pointersId) =>
	selectPointerById(state, pointersId)?.mapping;

// Select pointers sorted alphabetically by airline name
export const selectPointersByAlphabeticalOrder = createSelector(
	[(state, pointersId) => selectPointers(state, pointersId), state => state],
	(pointers, state) => {
		if (!pointers) return [];

		return [...pointers].sort((a, b) => {
			const nameA = selectAirlineName(state, a.airline_id) ?? '';
			const nameB = selectAirlineName(state, b.airline_id) ?? '';
			return nameA.localeCompare(nameB);
		});
	}
);
