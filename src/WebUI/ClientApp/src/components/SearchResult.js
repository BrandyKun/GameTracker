import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { changeImageSize } from "./Service";

const SearchResult = () => {
  const [results, SetSearchResults] = useState();
  const [filter, SetFilter] = useState();

  const state = useLocation();

  useEffect(() => {
    const getResults = () => {
      if (state !== null && state !== undefined) {
        console.log(state.state.result);
        SetSearchResults(state.state.result);
      }
    };
    getResults();
  }, [state]);

  // useEffect(() => {
  //   const filter = () => {
  //     const filteredList = results.filter(
  //       (data) =>
  //         filter.some((flt) => data[flt])
  //     )
  //   }
  // })

  const filterResults = (e) => {
    console.log(e.target.textContent);
    //To Do
    //if filter has e.text = remove it if not add it. then filter the results based if isgame etch and return that
  };

  /**
   * Only bring back results that have isGame: true
   */

  // const filteredResults = results.filter((result) => {
  //   const filterArray = [
  //     {
  //       label: "is game",
  //       value: 'isGame',
  //     },
  //     {
  //       label: "is platform",
  //       value: 'isPlatform',
  //     },
  //   ];

  //   let isInFilter = false;
  //   filterArray.forEach((filter) => {
  //     if (result[filter.value]) {
  //       isInFilter = true;
  //     }
  //   })
  //   return isInFilter;
  // });

  return (
    <div className="searchContainer">
      <h3> Results for: " {state.state.search.toUpperCase()} "</h3>

      <div className="filters-container">
        <button className="filter-btn filter-btn-game" onClick={filterResults}>
          Games
        </button>
        <button className="filter-btn filter-btn-platform">Platforms</button>
        <button className="filter-btn filter-btn-character">Characters</button>
      </div>
      <div className="search-results">
        {results &&
          results.map((searchItem) => (
            <Link
              to={"/games/" + searchItem.id}
              key={searchItem.id}
              className="search-card"
            >
              <div className="search-card-image-container">
                <img
                  src={changeImageSize(searchItem.imageUrl, "t_1080p")}
                  alt={searchItem.name}
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchResult;
