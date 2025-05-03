import React, {useState, useEffect } from 'react';
import Results from './Results';
import Cities from './Cities';

function Search () {

    const [cityName, setCityName] = useState('');
    const [result, setResult] = useState();
    const [citiesList, setCitiesList] = useState(() => {
        //Arrow function used, ensuring it only reads once from localStorage
        return JSON.parse(localStorage.getItem('cities')) || [];

    })
    
    const weather = async (query) => {
        let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd`;
      
        try {
          const response = await fetch(requestUrl);
          const data = await response.json();
          console.log(data);
          setResult(data);
        } catch (err) {
          console.error(err);
        }
    }
      
    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(citiesList));
      }, [citiesList]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!cityName) {
            alert("No result for the city name specified");
        }
        if (cityName.trim() !== " ") {
            weather(cityName);
        } 
    }
    
    
    const handleInputChange = (e) => {
        const { value } = e.target;
        setCityName(value);
    }
    
    return (

        <div className="d-flex flex-column align-items-center"> 
            <div className="m-3 w-75 col">
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                    <div className="m-2 mb-0 w-75">
                        <label htmlFor="city" className="form-label"></label>
                        <input type="city" className="form-control" id="city" onChange={handleInputChange} placeholder='Please search for a city'/>    
                    </div>
                    {!result ? (
                    <p></p>
                ) : (
                    <div className="m-0 w-75">
                        <Results result={result} citiesList={citiesList} setCitiesList={setCitiesList} setResult={setResult}/>
                    </div>
                )}
                
                    <button type="submit" className="custom-search-btn mt-4 me-3 ">Search</button>
                </form>
                
            </div>
            <Cities cityList={citiesList} setCitiesList={setCitiesList}/> 
        </div>
    )
}

export default Search;