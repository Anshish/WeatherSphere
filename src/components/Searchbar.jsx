import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_KEY } from '../../configure.js'
import Weather from './Weather.jsx';
import Forecast from './Forecast.jsx';


const Searchbar = () => {
    const [city,setCity]=useState('')
    const [weather,setWeather]=useState({})
    const [forecast,setForecast]=useState([])
    const [unit,setUnit]=useState('C')
    const [loading,setLoading]=useState(true)

    const handleChange=(e)=>{
        setCity(e.target.value)
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()

        // Convert city name to lowercase and replace spaces with %20
        const cityname=city.toLowerCase().replace(/\s+/g, '%20')
        
        try {
            const weather_response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`)
            const forecast_response=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
            setWeather(weather_response.data)
            setForecast(forecast_response.data.list)
            setLoading(false)
        } catch (error) {
            if (error.response) {
                // These error code are from the OpenWeatherMap API
                if (error.response.status === 404) {
                    toast.error('No such city found in our database. Please enter a valid city name.',{theme:'colored'});
                } else if (error.response.status === 429) {
                    toast.error('API rate limit exceeded. Try again later');
                } else if (error.response.status === 401) {
                    toast.error('Invalid API key');
                } else if(error.response.status === 400){
                    toast.error('Please enter a city name properly!');
                }else {
                    toast.error('Error while fetching weather data');
                }
            }else {
                toast.error(error.response.data.message);
            }
            console.error('Error fetching weather data:', error);
            setWeather({})
            setForecast([{}])
        }
        setCity('')
    }


  return (
    <div>
        <div className='searchbar'>
            <input type="text" placeholder='Search for city...' className='searchbar-input' value={city} onChange={handleChange}/>
            <button className='searchbar-button' onClick={handleSubmit}>Search</button>
        </div>
        <div></div>
        {
            loading? <div className='searchbar-loading'>Enter City Name In Search Bar To Get Insights</div> :(
                <div>
                    <div>
                        {
                            Object.keys(weather).length>0 &&
                            <Weather
                                weather={weather} 
                                unit={unit}
                                setUnit={setUnit}
                            />
                        }
                    </div>
                    <div>
                        {
                            forecast.length>0 &&
                            <Forecast 
                                forecast={forecast}
                                unit={unit}
                                setUnit={setUnit}
                            />
                        }
                    </div>
                </div>  
            )
        }
        
    </div> 
  )
}

export default Searchbar
