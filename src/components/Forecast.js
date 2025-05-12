import React, { useState } from 'react';


const Forecast = ({ result, setResult, setCurrentWeather, loading }) => {

    if (!result) {
        return <p className="m-4"></p>;
      }
    if (loading) {
        return <p className="m-2 fw-bold">Loading forecast...</p>;
    }
    
    const foreCastList = result.list.filter((item) => item.dt_txt.includes("00:00:00") );
    console.log(foreCastList);

    const dateFormat = (date) => {
        return date.split(' ').reverse().pop().split('-').reverse().join('-');
    }
    
    return (

        <div className="bg-border-secondary m-2">
            
            <button className="m-3"onClick={(e) => setCurrentWeather(true)}> ← Back to list</button>
            <h2 className="mb-4">5-Day Forecast, {result.city.name}.</h2>
            {foreCastList.map((item) => (
                <div key={item.dt}className=" custom-forecast d-flex flex-row  justify-content-between align-items-center border border-secondary">
                    <p className="m-2 fw-medium text-light">{dateFormat(item.dt_txt)}</p>
                    <div className=' d-flex flex-column flex-md-column m-2'>
                        <p className="mt-3 mb-0 text-light fw-medium">{item?.weather[0].description}</p>
                        <img style={{height: "80px", width: "80px"}}src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt=""/>
                    </div>
                    <div className = "row row-cols-2 m-2 p-2 w-50">
                        <p className="custom-forecast-details col text-light">Min Temp: {Math.floor(item.main.temp_min)}°C</p>
                        <p className="custom-forecast-details col text-light ">Max Temp: {Math.floor(item.main.temp_max)}°C</p>
                        <p className="custom-forecast-details col ">Humidity: {item.main.humidity}%</p>
                        <p className="custom-forecast-details col ">Wind Speed: {item.wind.speed}m/s</p>
                    </div>

                </div>

            ))}
            

        </div>
    )
}

export default Forecast;