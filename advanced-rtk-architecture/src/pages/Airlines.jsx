import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Plane} from 'lucide-react';

import {updateEntities, cleanUpEntities} from '@store/actions';
import {usePointersByAlphabeticalOrder} from '@hooks/usePointers';

import {normalizeData} from '@utils/normalizer';

import AirlineCard from '@components/AirlineCard';

export default function Airports() {
	const dispatch = useDispatch();
	const {region} = useParams();

	const pointersId = region;
	const pointers = usePointersByAlphabeticalOrder(pointersId);

	useEffect(() => {
		fetch(`http://localhost:5002/airlines/${region}`)
			.then(res => res.json())
			.then(data => {
				const normalizedData = normalizeData(data, pointersId);
				dispatch(updateEntities(normalizedData));
			});

		return () => dispatch(cleanUpEntities());
	}, [dispatch, region, pointersId]);

	if (!pointers?.length) {
		return null;
	}

	return (
		<section className="pt-5 px-20">
			<h1 className="text-2xl font-bold mb-7 pb-7 border-b-2 border-solid border-gray-600 capitalize flex items-center gap-2">
				<Plane className="w-6 h-6 text-gray-400" />
				<span>{region}</span>
			</h1>

			{pointers.map(pointersMap => {
				const {
					airline_id: airlineId,
					airport_id: airportId,
					country_id: countryId,
				} = pointersMap;

				const componentKey = `${airlineId}/${airportId}/${countryId}`;

				return (
					<AirlineCard
						key={componentKey}
						airlineId={airlineId}
						airportId={airportId}
						countryId={countryId}
					/>
				);
			})}
		</section>
	);
}
