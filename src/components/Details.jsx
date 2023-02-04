import {React, useEffect, useState} from 'react'
import { getCurrentWeather } from '../api/getCurrentWeather';
import mockCondition from '../mocks/mockCondition.json';

const Details = (props) => {
    const { code, country, city } = props;
    const [currentWeather, setCurrentWeather] = useState();
    const [error, setError] = useState({ hasError: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getCurrentWeather(code).then(
        (data) => {
            setCurrentWeather(data);
        }
      ).catch((err) => {
        handleError(err)
      }).finally(() => {
        setLoading(false);
      })
    }, [])

    const handleError = (err) => {
      setError({ hasError: true, message: err.message });
    }

    return (
        <aside className='box'>
            <h2>Current Weather</h2>
            {error.hasError && <div>{error.message}</div>}

            {loading && <p>Loading...</p>}

            {currentWeather?.map((weather) => {

                let icon = weather.WeatherIcon < 10 ? `0${weather.WeatherIcon}` : weather.WeatherIcon;

                return (
                    <div key={weather.EpochTime}>
                        <img src={`https://developer.accuweather.com/sites/default/files/${icon}-s.png`} alt={weather.WeatherText} />
                        <h3 >{weather.Temperature.Metric.Value} {weather.Temperature.Metric.Unit}</h3>
                        <p >{weather.WeatherText}</p>
                        <p >{city}, {country}</p>
                    </div>
                )
            })}

        </aside>
    )
}

export default Details