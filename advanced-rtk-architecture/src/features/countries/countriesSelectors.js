import {createSelector} from '@reduxjs/toolkit';
import {countriesAdapter} from './countriesSlice';

const {selectById: selectCountryById} = countriesAdapter.getSelectors(
	state => state.countries
);

export const selectCountry = (state, countryId) =>
	selectCountryById(state, countryId);

export const selectCountryName = createSelector(
	[selectCountry],
	country => country?.name
);
