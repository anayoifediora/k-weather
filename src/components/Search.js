import React, {useState, useEffect } from 'react';
import Results from './Results';

function Search () {

    const [cityName, setCityName] = useState('');
    const [result, setResult] = useState();
    
    
    const weather = async (query) => {
        let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=443ce9d7f610c028f54310f3c2bc25fd`;
      
        try {
          const response = await fetch(requestUrl);
          const data = await response.json();
          console.log(data);
          setResult(data);
        } catch (err) {
          console.error(err)
        }
    }
      
    useEffect(() => {
        weather(cityName);
    }, [cityName])
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (cityName.trim() !== " ") {
    //         weather(cityName);
    //     } 
    // }
    
    
    const handleInputChange = (e) => {
        const { value } = e.target;
        setCityName(value);
    }
    
    return (

        <> 
            <div>
                <form>
                    <div className="m-2 mb-0">
                        <label htmlFor="city" className="form-label">Search</label>
                        <input type="city" className="form-control" id="city" onChange={handleInputChange} placeholder='Please search for a city'/>
                    
                        
                    </div>
                    <div className="mt-0">
                        <Results result={result}/>
                     </div>
                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                </form>
            </div>
            
        
        </>
    )
}

export default Search;