import React, { useState } from 'react';


const Forecast = ({ result, setResult, setCurrentWeather }) => {

    if (!result) {
        return <p className="m-4"></p>;
      }
    const foreCastList = result.list.filter((item) => item.dt_txt.includes("00:00:00") );
    console.log(foreCastList);

    const dateFormat = (date) => {
        return date.split(' ').reverse().pop().split('-').reverse().join('-');
    }
    
    return (

        <div className="bg-border-secondary m-2 col-md-12">
            <button className="m-3"onClick={(e) => setCurrentWeather(true)}>Back to list</button>
            <h2>5 Day Forecast, {result.city.name}.</h2>
            {foreCastList.map((item) => (
                <div key={item.dt}className=" custom-forecast d-flex flex-row justify-content-between align-items-center border border-secondary">
                    <p className="m-2 fs-4 fw-medium text-light">{dateFormat(item.dt_txt)}</p>
                    <div className=' d-flex flex-row m-2'>
                        <p className="mt-3 fs-4 text-light fw-medium">{item?.weather[0].description}</p>
                        <img style={{height: "90px", width: "90px"}}src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt=""/>
                    </div>
                    <div className = "row row-cols-2 m-2 p-2 w-50">
                        <p className="col text-light fs-5">Min Temp: {Math.floor(item.main.temp_min)}°C</p>
                        <p className="col text-light fs-5">Max Temp: {Math.floor(item.main.temp_max)}°C</p>
                        <p className="col fs-5">Humidity: {item.main.humidity}%</p>
                        <p className="col fs-5">Wind Speed: {item.wind.speed}m/s</p>
                    </div>

                </div>

            ))}
            

        </div>
    )
}

export default Forecast;