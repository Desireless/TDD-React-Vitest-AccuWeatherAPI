import {React, useEffect, useState} from 'react'
import { getCurrentWeather } from '../api/getCurrentWeather';
import mockCondition from '../mocks/mockCondition.json';

const Details = (props) => {
    const { code, country, city } = props;
    const [currentWeather, setCurrentWeather] = useState();
    const [error, setError] = useState({ hasError: false });

    useEffect(() => {
      getCurrentWeather(code).then(
        (data) => {
            setCurrentWeather(data);
        }
      ).catch((err) => {
        handleError(err)
      })
    }, [])

    const handleError = (err) => {
      setError({ hasError: true, message: err.message });
    }

    return (
        <>
            <h2>Current Weather</h2>
            {error.hasError && <div>{error.message}</div>}
            {currentWeather?.map((weather) => {
                return (
                    <div key={weather.EpochTime}>
                        <h3 key={weather.Temperature.Metric.Value}>{weather.Temperature.Metric.Value} {weather.Temperature.Metric.Unit}</h3>
                        <p key={weather.WeatherText}>{weather.WeatherText}</p>
                        <p key={city}>{city}, {country}</p>
                    </div>
                )
            })}
            {/* <h3>{currentWeather?.Temperature.Metric.Value} {currentWeather?.Temperature.Metric.Unit}</h3>
            <p>{currentWeather?.WeatherText}</p>
            <p>{city}, {country}</p> */}

        </>
    )
}

export default Details