import {useAirlineName, useAirlineFoundation} from '@hooks/useAirlines';
import {useCountryName} from '@hooks/useCountries';

export default function AirlineCard({airlineId, countryId}) {
	const airlineName = useAirlineName(airlineId);
	const airlineFoundation = useAirlineFoundation(airlineId);
	const countryName = useCountryName(countryId);

	return (
		<div className="rounded-xl overflow-hidden mb-5">
			<div className="bg-indigo-600 text-white px-5 py-3">
				<h2 className="font-bold text-lg">{airlineName}</h2>
			</div>

			<div className="bg-gray-100 px-5 py-3">
				<ul className="text-sm text-gray-700">
					<li>
						<span className="font-bold">Foundation:</span> {airlineFoundation}
					</li>
					<li>
						<span className="font-bold">Country:</span> {countryName}
					</li>
				</ul>
			</div>
		</div>
	);
}
