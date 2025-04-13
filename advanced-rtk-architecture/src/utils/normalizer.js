export function normalizeData(data, region) {
	const airlines = {}; // Will store normalized airline data using airline ID as key
	const countries = {}; // Will store normalized country data using country ID as key

	// Initialize a pointer object grouped by region
	const pointers = {
		id: region, // Region acts as the unique ID for this pointers entry
		mapping: [], // Will hold relationships between airlines and countries
	};

	data.forEach(airline => {
		// Normalize and store airline data
		airlines[airline.id] = {
			id: airline.id,
			name: airline.name,
			foundation: airline.foundation,
		};

		// Only add country if it hasn't already been added
		if (!countries[airline.country.id]) {
			countries[airline.country.id] = {
				id: airline.country.id,
				name: airline.country.name,
			};
		}

		// Create the pointer relation between airline and country
		pointers.mapping.push({
			airline_id: airline.id,
			country_id: airline.country.id,
		});
	});

	// Return a normalized structure ready for the Redux store
	return {
		airlines,
		countries,
		pointers,
	};
}
