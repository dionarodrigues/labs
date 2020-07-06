const API_KEY = 'pagQ5kOhGEO8raPcPJWeEdvBXL50GT07';
const baseURL = 'http://dataservice.accuweather.com';

const getWeather = async (id) => {
  const url = `${baseURL}/currentconditions/v1/`;
  const query = `${id}?apikey=${API_KEY}`;
  
  const response = await fetch( url + query );
  const data = await response.json();

  return data[0];
}

const getCity = async (city) => {
  const url = `${baseURL}/locations/v1/cities/search`;
  const query = `?apikey=${API_KEY}&q=${city}`;

  const response = await fetch( url + query);
  const data = await response.json();

  return data[0];
}