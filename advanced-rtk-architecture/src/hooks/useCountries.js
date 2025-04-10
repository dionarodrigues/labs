import {useSelector} from 'react-redux';
import {selectCountryName} from '@features/countries/countriesSelectors';

export const useCountryName = countryId =>
	useSelector(state => selectCountryName(state, countryId));
