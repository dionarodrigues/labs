import {useSelector} from 'react-redux';
import {
	selectAirlineName,
	selectAirlineFoundation,
} from '@features/airlines/airlinesSelectors';

export const useAirlineName = airlineId =>
	useSelector(state => selectAirlineName(state, airlineId));

export const useAirlineFoundation = airlineId =>
	useSelector(state => selectAirlineFoundation(state, airlineId));
