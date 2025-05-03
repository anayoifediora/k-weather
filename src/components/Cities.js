import React, { useState } from 'react';
import Forecast from './Forecast';

const Cities = ({ cityList, setCitiesList }) => {

    const [currentWeather, setCurrentWeather] = useState(true);
    const [result, setResult] = useState();
    const handleDelete = (e) => {
        e.stopPropagation();
        const updatedList =  cityList.filter((city) => String(city.id) !== e.target.dataset.id );
        setCitiesList(updatedList);
        localStorage.setItem('cities', JSON.stringify(updatedList));
    }

    const forecast = async (query) => {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd`;
        try {
            const response = await fetch(forecastUrl);
            const data = await response.json();
            console.log(data);
            setResult(data);
        } catch (err) {
            console.error(err);
        }
    }
    const fetchForecast = (e) => {
        forecast(e.currentTarget.dataset.cityname);
        setCurrentWeather(false);
    }
    return (
        
        <div className="w-75">
            {currentWeather? (
            <div>
                {
                    cityList.map((city) => (
                    <section key={city.id}className="custom-result m-3 d-flex flex-column" data-cityname={city.name} onClick={fetchForecast}>
                        
                        <div className="d-flex justify-content-between">
                            <p className="text-white fs-3 fw-medium">{city.name}</p>
                            <p className="text-light fs-3 fw-medium">{Math.floor(city.main.temp)}°C</p>    
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='d-inline-flex'>
                                <p className="text-light-emphasis pe-2">{city.weather[0]?.description}</p>
                                <img style={{height: "70px", width: "70px"}}src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt=""/>

                            </div>
                            <div className="d-inline-flex">
                                <p className="text-light-emphasis ms-1">Low: {Math.floor(city.main.temp_min)}°C</p>
                                <p className="text-light-emphasis ms-2">High: {Math.floor(city.main.temp_max)}°C</p>
                            </div>
                        </div>
                        <button className="custom-delete-btn" data-id={city.id} onClick={handleDelete}>Delete</button>
                    </section>
                    ))
                }
                
            </div>
            ) : (
            <Forecast result={result} setResult={setResult} setCurrentWeather={setCurrentWeather}/>
            )}
        </div>

    )
}

export default Cities;