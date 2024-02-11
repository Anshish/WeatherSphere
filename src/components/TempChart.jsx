import React from 'react'
import { Line, Bar, Radar,PolarArea,Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, RadialLinearScale, PointElement, BarElement, ArcElement,LineElement } from 'chart.js';

// Register necessary scale types and chart elements
Chart.register(CategoryScale, LinearScale, RadialLinearScale, PointElement, BarElement,ArcElement,LineElement);


const TempChart = ({forecastData}) => {
  const dates=[]
  const days=[]
  const temps=[]
  const clouds=[]
  const min_temps=[]
  const max_temps=[]
  const humidities=[]
  const winds=[]

  forecastData.forEach(([date,data])=>{
    const d= data[0].dt * 1000;
    const day = new Date(d).toLocaleDateString('en-US', { weekday: 'long' });
    const temp = data[0].main.temp;
    const cloud = data[0].clouds.all;
    const min_temp = data[0].main.temp_min;
    const max_temp = data[0].main.temp_max;
    const humidity = data[0].main.humidity;
    const wind=data[0].wind.speed;

    dates.push(date);
    days.push(day);
    temps.push(temp);
    clouds.push(cloud);
    min_temps.push(min_temp);
    max_temps.push(max_temp);
    humidities.push(humidity);
    winds.push(wind);
  })

  const temperatureCanvasId = 'temperatureChart';
  const humidityCanvasId = 'humidityChart';
  const cloudCanvasId = 'cloudChart';
  const windCanvasId = 'windChart';

  const temperatureData = {
    labels: days,
    datasets: [
      {
        label: 'Temperature (K)',
        data: temps,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Min Temperature (K)',
        data: min_temps,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Max Temperature (K)',
        data: max_temps, 
        fill: false,
        borderColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const humidityData = {
    labels: days,
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidities,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const cloudData = {
    labels: days,
    datasets: [
      {
        label: 'Cloudiness (%)',
        data: clouds,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const windData = {
    labels: days,
    datasets: [
      {
        label: 'Wind Speed (m/s)',
        data: winds,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };
    
  return (
    <div className='charts'>
      <div className='charts-elements'>
        <h2>Temperature Trends (K)</h2>
        <Line data={temperatureData} />
      </div>
      <div className='charts-elements'>
        <h2>Humidity Trends (%)</h2>
        <Bar data={humidityData} />
      </div>
      <div className='charts-elements'>
        <h2>Cloudiness Trends (%)</h2>
        <Line data={cloudData} />
      </div>
      <div className='charts-elements'>
        <h2>Wind Speed Trends (m/s)</h2>
        <PolarArea data={windData} />
      </div>
    </div>
  )
}

export default TempChart