import React, { useState } from 'react';
import Forecast from './Forecast';

const Cities = ({ cityList, setCitiesList }) => {
    //Tracks the loading state while fetching forecast
    const [loading, setLoading] = useState(false);

    //Toggles between current weather view and forecast view
    const [currentWeather, setCurrentWeather] = useState(true);

    const [result, setResult] = useState();

    //Deletes city from the list
    const handleDelete = (e) => {

        e.stopPropagation();
        const updatedList =  cityList.filter((city) => String(city.id) !== e.target.dataset.id );
        setCitiesList(updatedList);
        localStorage.setItem('cities', JSON.stringify(updatedList));
    }

    //Fetches 5-day forecast data from OpenWeather API
    const forecast = async (query) => {
        setLoading(true);
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd`;
        try {
            const response = await fetch(forecastUrl);
            const data = await response.json();
            console.log(data);
            setResult(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    //Triggered when a city is clicked - fetches its forecast data
    const fetchForecast = (e) => {
        forecast(e.currentTarget.dataset.cityname);
        setCurrentWeather(false);
    }
    return (
        
        <div className=" custom-city-container col-xl-6 col-lg-7 col-md-8 col-sm-10">
            {/* Show list of current weather for each city */}
            {currentWeather? (
            <div>
                {
                    cityList.map((city) => (
                    <section 
                        key={city.id}
                        className="custom-result m-3 d-flex flex-column" 
                        data-cityname={city.name} 
                        onClick={fetchForecast}
                    >
                        
                        <div className="d-flex justify-content-between">
                            <p className="text-white fs-3 fw-medium">{city.name}, {city.sys.country}</p>
                            <p className="text-light fs-3 fw-medium">{Math.floor(city.main.temp)}°C</p>    
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='d-inline-flex'>
                                <p className="text-light-emphasis pe-2">{city.weather[0]?.description}</p>
                                <img style={{height: "80px", width: "80px"}}src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt=""/>

                            </div>
                            <div className="d-inline-flex">
                                <p className="text-light-emphasis ms-1">Low: {Math.floor(city.main.temp_min)}°C</p>
                                <p className="text-light-emphasis ms-2">High: {Math.floor(city.main.temp_max)}°C</p>
                            </div>
                        </div>
                        <button className="custom-delete-btn fw-bold" data-id={city.id} onClick={handleDelete}>Delete</button>
                    </section>
                    ))
                }
                
            </div>
            ) : (
            <Forecast result={result} setResult={setResult} setCurrentWeather={setCurrentWeather} loading={loading}/>
            )}
        </div>

    )
}

export default Cities;