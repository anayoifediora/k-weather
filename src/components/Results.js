import React from 'react';

const Results = ({ result, citiesList, setCitiesList, setResult, cityName }) => {
    //Check that informs client if there are no results
    if (!result || !result.name || !result.sys || !result.main) {
        return <p className="m-4 text-danger">No results for this city</p>;  
      }

    const addToList = () => {
        const alreadyExists = citiesList.some(city => city.id === result.id);
      
        if (!alreadyExists) {
          const updatedList = [...citiesList, result]; // update the array with the search result
          setCitiesList(updatedList); // trigger re-render
          localStorage.setItem('cities', JSON.stringify(updatedList)); // set to localStorage
        } else {
            alert(`${result.name} already exists in the list.`);
        }
        //Clears the result element.
        setResult({
            name: " ",
            sys: {
                country: " ",
            }
        });
      };
      

    return (
        
            
            <div className="custom-result-bar ms-2 d-flex flex-column w-50">
                
                <div className="d-flex justify-content-between bg-light">
                    <p className = "custom-search-result m-1 p-1" onClick={addToList}>{result.name}, {result.sys.country}</p>    
                </div>
            </div>
            
        
    )
}

export default Results;