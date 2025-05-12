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
    //API call to fetch weather data
    const weather = async (query) => {
        let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd`;
      
        try {
          const response = await fetch(requestUrl);
          const data = await response.json();
        //   console.log(data);
          setResult(data);
        } catch (err) {
          console.error(err);
        }
    }
    //Update the state in localStorage everytime "citiesList" changes 
    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(citiesList));
      }, [citiesList]);
    
    //Handles the form submission for search
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!cityName) {
            alert("No result for the city name specified");
        }
        if (cityName.trim() !== " ") {
            weather(cityName);
        } 
    }
    
    //Updates the state as user input changes
    const handleInputChange = (e) => {
        const { value } = e.target;
        setCityName(value);
    }
    
    return (

        <div className="custom-search d-flex flex-column align-items-center"> 
            <div className="custom-search m-3 col-lg-6 col-md-7 col-sm-12">
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                    <div className="m-2 mb-0" style={{width: "50%"}}>
                        <label htmlFor="city" className="form-label"></label>
                        <input type="city" className="form-control border border-black" id="city" onChange={handleInputChange} placeholder='Please search for a city'/>    
                    </div>
                    {!result ? (
                    <p></p>
                ) : (
                    
                    <Results result={result} citiesList={citiesList} setCitiesList={setCitiesList} setResult={setResult} cityName={cityName}/>
                    
                )}
                
                    <button type="submit" className="custom-search-btn m-3">Search</button>
                </form>
                
            </div>
            {/* List of saved cities */}
            <Cities cityList={citiesList} setCitiesList={setCitiesList}/> 
        </div>
    )
}

export default Search;