import { React, useState } from 'react'
import { getLocation } from '../api/getLocation.js';
import Details from './Details.jsx';

const Clima = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [error, setError] = useState({ hasError: false });
  const [detailState, setDetailState] = useState({
    key: '',
    country: '',
    city: '',
    showDetail: false
  }
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    getLocation(city)
      .then((data) => {
        setCities(data);
      }).catch((err) => {
        handleError(err)
      })
  }

  const handleListClick = (e) => {
    setDetailState({
      key: e.Key,
      country: e.Country.LocalizedName,
      city: e.LocalizedName,
      showDetail: true
    })
  }

  const handleError = (err) => {
    setError({ hasError: true, message: err.message });
  }

  return (
    <div className='container'>
      {error.hasError && <div>{error.message}</div>}
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          aria-label='search input'
          type='text'
          placeholder='Where do you live?'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
        >Search</button>
      </form>

      {cities?.map(city => (
        <li key={city.Key}
          onClick={() => handleListClick(city)}>
          {city.LocalizedName} - {city.Country.LocalizedName}
        </li>
      ))}

      {detailState.showDetail && <Details code={detailState.key} country={detailState.country} city={detailState.city} />}
    </div>
  )
}

export default Clima