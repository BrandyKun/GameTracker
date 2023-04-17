import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const [results, SetSearchResults] = useState();

  const { state } = useLocation();

  useEffect(() => {
    const getResults =() => {
      if(state !== null && state !== undefined)
      {
        console.log('Results back',state)
        SetSearchResults(state);
      }
    }
    getResults();
  }, [])
  

  return <div>SearchResult: 
  {results.map((search) => (
    <p> {search.name}</p>
  ))} </div>;
};

export default SearchResult;
