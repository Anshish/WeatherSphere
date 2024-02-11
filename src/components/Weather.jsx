import React, { useState } from 'react'

const Weather = ({weather,unit,setUnit}) => {

    const today = new Date(weather.dt * 1000); // Convert Unix timestamp to JavaScript Date object
    const date=today.toLocaleDateString();
    const time=today.toLocaleTimeString();

    const convertKelvinToCelsius=(temp)=>{
        return (temp-273.15).toFixed(2)
    }

    const convertCelsiusToFahrenheit=(temp)=>{
        return ((temp*9/5)+32).toFixed(2)
    }

    const convertFahrenheitToCelsius=(temp)=>{
        return ((temp-32)*5/9).toFixed(2)
    }

    const handleUnitChange=()=>{
        if(unit==='C'){
            setUnit('F')
        }else{
            setUnit('C')
        }
    }

  return (
    <div className={weather? 'weather' : 'weather-hidden'}>
        <div className="weather-left">
            <div className='weather-location'>
                {weather.name},  {weather.sys.country}
            </div>

            <div className="weather-date">
                {date}
            </div>

            <div className="weather-time">
                {time}
            </div>

            <div className='weather-logo'>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            </div>

            <div className='weather-description'>
                {weather.weather[0].description}
            </div>

            <div className="weather-temperature">
                    {unit === 'C' ? 
                        Math.round(convertKelvinToCelsius(weather.main.temp)) + ' °C' : 
                        Math.round(convertCelsiusToFahrenheit(convertKelvinToCelsius(weather.main.temp))) + ' °F'
                    }
            </div>

            <div className='weather-unit-switch'>
                <label className="weather-switch">Celsius
                    <input type="radio" name="unit" value="C" checked={unit === 'C'} onChange={handleUnitChange} />
                </label>
                <label className="weather-switch">Fahrenheit
                    <input type="radio" name="unit" value="F" checked={unit === 'F'} onChange={handleUnitChange} />
                </label>
            </div>
        </div>

        <div className="weather-right">
            <div className='weather-element'>Wind Speed: {weather.wind.speed} m/s</div>

            <div className='weather-element'>Humidity: {weather.main.humidity}%</div>

            <div className='weather-element'>Feels Like: {unit === 'C' ? 
                    Math.round(convertKelvinToCelsius(weather.main.feels_like)) + ' °C' : 
                    Math.round(convertCelsiusToFahrenheit(convertKelvinToCelsius(weather.main.feels_like))) + ' °F'}
            </div>

            <div className='weather-element'>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>

            <div className='weather-element'>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>

            <div className='weather-element'>Max Temp: {unit === 'C' ? 
                    Math.round(convertKelvinToCelsius(weather.main.temp_max)) + ' °C' : 
                    Math.round(convertCelsiusToFahrenheit(convertKelvinToCelsius(weather.main.temp_max))) + ' °F'}
            </div>

            <div className='weather-element'>Min Temp: {unit === 'C' ? 
                    Math.round(convertKelvinToCelsius(weather.main.temp_min)) + ' °C' : 
                    Math.round(convertCelsiusToFahrenheit(convertKelvinToCelsius(weather.main.temp_min))) + ' °F'}
            </div>

            <div className='weather-element'>Clouds: {weather.clouds.all}%</div>    
        </div>
    </div>
  )
}

export default Weather