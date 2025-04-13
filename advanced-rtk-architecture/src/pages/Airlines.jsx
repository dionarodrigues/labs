import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Plane} from 'lucide-react';

import {updateEntities, cleanUpEntities} from '@store/actions';
import {usePointersByAlphabeticalOrder} from '@hooks/usePointers';

import {normalizeData} from '@utils/normalizer';

import AirlineCard from '@components/AirlineCard';

export default function Airlines() {
	const dispatch = useDispatch();
	const {region} = useParams(); // Get the region from the URL

	const pointersId = region;
	const pointers = usePointersByAlphabeticalOrder(pointersId); // Get pointers sorted alphabetically

	useEffect(() => {
		// Fetch airlines data based on the region
		fetch(`http://localhost:5002/airlines/${region}`)
			.then(res => res.json())
			.then(data => {
				// Normalize the response to fit our Redux structure
				const normalizedData = normalizeData(data, pointersId);
				// Dispatch the normalized data to update the store
				dispatch(updateEntities(normalizedData));
			});

		// Cleanup when the component unmounts
		return () => dispatch(cleanUpEntities());
	}, [dispatch, region, pointersId]);

	// If no pointers found, don't render anything
	if (!pointers?.length) {
		return null;
	}

	return (
		<section className="pt-5 px-20">
			<h1 className="text-2xl font-bold mb-7 pb-7 border-b-2 border-solid border-gray-600 capitalize flex items-center gap-2">
				<Plane className="w-6 h-6 text-gray-400" />
				<span>{region}</span>
			</h1>

			{/* Render an AirlineCard for each pointer mapping */}
			{pointers.map(pointersMap => {
				const {airline_id: airlineId, country_id: countryId} = pointersMap;

				// Unique key based on related entities
				const componentKey = `${airlineId}/${countryId}`;

				return (
					<AirlineCard
						key={componentKey}
						airlineId={airlineId}
						countryId={countryId}
					/>
				);
			})}
		</section>
	);
}
