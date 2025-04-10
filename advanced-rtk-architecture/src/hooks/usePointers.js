import {useSelector} from 'react-redux';
import {selectPointersByAlphabeticalOrder} from '@features/pointers/pointersSelectors';

export const usePointersByAlphabeticalOrder = pointersId =>
	useSelector(state => selectPointersByAlphabeticalOrder(state, pointersId));
