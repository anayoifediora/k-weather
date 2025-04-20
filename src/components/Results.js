import React, {useState, useEffect } from 'react';

import Cities from './Cities';
const Results = ({ result }) => {
    let citiesList = JSON.parse(localStorage.getItem('cities')) || [];
    
    const addToList = () => {
        if (citiesList.indexOf(result) === -1) {
            citiesList.push(result);
        }
        
        localStorage.setItem('cities', JSON.stringify(citiesList));
        console.log(citiesList);
    }

    if (!result || !result.main) {
        return <p>No data yet.</p>   
    } else if (result.message) {
        return <p>No city found</p>
    }

    return (
        <div>
            <div className="custom-result m-2 d-flex flex-column">
                
                <div className="d-flex justify-content-between">
                    <p onClick={addToList}>{result.name}, {result.sys.country} </p>    
                </div>
            </div>
            <div>
                <Cities cityList={citiesList}/>
            </div>
        </div>
    )
}

export default Results;