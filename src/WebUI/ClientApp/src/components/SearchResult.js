import React from 'react'
import { useLocation } from 'react-router-dom'

const SearchResult = () => {
    const {data} = useLocation();
    console.log(data)

  return (
    <div>SearchResult {data} </div>
  )
}

export default SearchResult