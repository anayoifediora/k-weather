import React from 'react';

const Cities = (props) => {

        const handleDelete = (e) => {
            props.cityList.filter((city) => city.id !== e.target.id )
        }
    return (
        <>
            {
                props.cityList.map((city) => (
                <div key={city.id}className="custom-result m-2 bg-secondary bg-gradient d-flex flex-column">
                    
                    <div className="d-flex justify-content-between">
                        <p className="text-light fs-3 fw-bold">{city.name}</p>
                        <p className="text-light fs-3 fw-bold">{Math.floor(city.main.temp)}°C</p>    
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className='d-inline-flex'>
                            <p className="text-light pe-2">{city.weather[0]?.description}</p>
                            <img src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt=""/>

                        </div>
                        <div className="d-inline-flex">
                            <p className="text-light ms-1">Low: {Math.floor(city.main.temp_min)}°C</p>
                            <p className="text-light ms-2">High: {Math.floor(city.main.temp_max)}°C</p>
                        </div>
                    </div>
                    <button id={city.id} onClick={handleDelete}>Delete</button>
                </div>
                ))
            }
        </>

    )
}

export default Cities;