export function normalizeData(data, group) {
	const airlines = {};
	const countries = {};
	const airports = {};
	const pointers = {
		id: group,
		mapping: [], // Initialize the mapping array for this group
	};

	data.forEach(airline => {
		// Normalize airline data
		airlines[airline.id] = {
			id: airline.id,
			name: airline.name,
			slug: airline.slug,
			foundation: airline.foundation,
		};

		// Normalize country data if not already present
		if (!countries[airline.country.id]) {
			countries[airline.country.id] = {
				id: airline.country.id,
				name: airline.country.name,
				slug: airline.country.slug,
			};
		}

		// Normalize airport data if not already present
		if (!airports[airline.airport.id]) {
			airports[airline.airport.id] = {
				id: airline.airport.id,
				name: airline.airport.name,
				slug: airline.airport.slug,
			};
		}

		// Add pointers for the 'europe' group
		pointers.mapping.push({
			airline_id: airline.id,
			country_id: airline.country.id,
		});
	});

	return {
		airlines,
		countries,
		airports,
		pointers,
	};
}
