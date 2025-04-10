import {createSelector} from '@reduxjs/toolkit';
import {pointersAdapter} from './pointersSlice';
import {selectAirlineName} from '@features/airlines/airlinesSelectors';

const {selectById: selectPointerById} = pointersAdapter.getSelectors(
	state => state.pointers
);

export const selectPointers = (state, pointersId) =>
	selectPointerById(state, pointersId)?.mapping;

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
