import React from 'react'
import TempChart from './TempChart'

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


const ForecastDay =({day,unit})=>{
    

    const { dt, main, weather } = day;
    let date = new Date(dt * 1000);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const temperature = main.temp;
    const description = weather[0].description;
    date=date.toLocaleDateString()

    return (
        <div className="forecast-day">
          <div className="forecast-day-date">{date}</div>

          <div className="forecast-day-header">{dayOfWeek}</div>

          <div className="forecast-day-image">
            <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
          </div>

          <div className="forecast-day-info">
            <div>{unit === 'C' ? 
                    Math.round(convertKelvinToCelsius(temperature)) + ' °C' : 
                    Math.round(convertCelsiusToFahrenheit(convertKelvinToCelsius(temperature))) + ' °F'}
            </div>

            <div>{description}</div>
          </div>
        </div>
      );
}

const Forecast = ({forecast,unit}) => {
    const forecastDataEachDay={}


    forecast.forEach(day=>{
        const date=day.dt_txt.split(' ')[0]

        if(!forecastDataEachDay[date]){
            forecastDataEachDay[date]=[]
        }

        forecastDataEachDay[date].push(day)
    })

    const forecastData=Object.entries(forecastDataEachDay)

    

  return (
    <div className='forecast'>
        <h2>Upcoming Days</h2>
        <div className='forecast-days'>
            {
                forecastData.map(([date,data])=>(
                    <ForecastDay key={date} day={data[0]} unit={unit} />
                ))
            }
        </div>
        <TempChart forecastData={forecastData} />
    </div>
  )
}

export default Forecast