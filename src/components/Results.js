import React from 'react';

const Results = ({ result, citiesList, setCitiesList, setResult }) => {
    if (!result || !result.name || !result.sys || !result.main) {
        return <p className="m-4">No results for this</p>;
      }
    const addToList = () => {
        const alreadyExists = citiesList.some(city => city.id === result.id);
      
        if (!alreadyExists) {
          const updatedList = [...citiesList, result]; // make a new array
          setCitiesList(updatedList); // trigger re-render
          localStorage.setItem('cities', JSON.stringify(updatedList)); // set to localStorage
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
        <div className = "col-lg-4">
            
            <div className="custom-result-bar ms-2 d-flex flex-column w-75">
                
                <div className="d-flex justify-content-between">
                    <p className = "custom-search-result m-1 p-1" onClick={addToList}>{result.name}, {result.sys.country}</p>    
                </div>
            </div>
            
        </div>
    )
}

export default Results;