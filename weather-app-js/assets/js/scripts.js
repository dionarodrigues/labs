const $cityForm = document.querySelector('.change-location');
const $card = document.querySelector('.card');
const $details = document.querySelector('.details');
const $imgTime = document.querySelector('img.time');
const $imgIcon = document.querySelector('.icon img');

const forecast = new Forecast();

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  $details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  let imgTimeSrc = weather.IsDayTime ? 'assets/img/day.svg' : 'assets/img/night.svg';
  let imgIconSrc = `assets/img/icons/${weather.WeatherIcon}.svg`

  $imgTime.setAttribute('src', imgTimeSrc);
  $imgIcon.setAttribute('src', imgIconSrc);

  if($card.classList.contains('d-none')) {
    $card.classList.remove('d-none');
  }
}

const updateCity = (city) => {
  forecast.updateData(city).then(data => updateUI(data))
  .catch(err => console.log(err));
}

const handleSubmit = (e) => {
  e.preventDefault();

  const city = $cityForm.city.value.trim();  
  $cityForm.reset();

  updateCity(city);

  localStorage.setItem('weather_city', city);  
}

window.addEventListener('load', function() {
  const cityStorage = localStorage.getItem('weather_city');
  if(cityStorage) {
    updateCity(cityStorage);
  }
}, false)


$cityForm.addEventListener('submit', handleSubmit);