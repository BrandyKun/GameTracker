import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { changeImageSize } from "./Service";

const SearchResult = () => {
  const [results, SetSearchResults] = useState();
  const [filter, SetFilter] = useState([]);
  const [diplays, searchToShow] = useState([]);

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

  useEffect(() => {
    const filterTheResults = () => {
      /**
       * Only bring back results that have isGame: true
       */
      let filteredResults = [];
      if (results && filter.length > 0) {
        filteredResults.push(
          results.filter((result) => {
            let isInFilter = false;
            filter.forEach((flt) => {
              if (result[flt]) {
                isInFilter = true;
              }
            });
            return isInFilter;
          })
        );
        searchToShow(...filteredResults);
      } else if (results) {
        filteredResults.push(results);
        searchToShow(...filteredResults);
      }
    };
    filterTheResults();
  }, [filter, results]);

  const filterResults = (e) => {
    //To Do
    let boolName = e.target.id;
    let filterToSet = [...filter];
    let classToToggle = document.querySelector(`#${boolName}`);
    //if filter has e.text = remove it if not add it. then filter the results based if isgame etch and return that
    if (!filterToSet.includes(boolName)) {
      filterToSet.push(boolName);
      classToToggle.classList.add("active");
    } else {
      let foundIndex = filterToSet.indexOf(boolName);
      if (foundIndex > -1) filterToSet.splice(foundIndex, 1);
      classToToggle.classList.remove("active");
    }
    SetFilter(filterToSet);
    console.log(filter);
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
        <button
          className="filter-btn filter-btn-game"
          id="isGame"
          onClick={filterResults}
        >
          Games
        </button>
        <button
          className="filter-btn filter-btn-platform"
          id="isPlatform"
          onClick={filterResults}
        >
          Platforms
        </button>
        <button
          className="filter-btn filter-btn-character"
          id="isCharacter"
          onClick={filterResults}
        >
          Characters
        </button>
      </div>
      <div className="search-results">
        {diplays &&
          diplays.map((searchItem) => {
            let endpoint = "";
            if (searchItem.isGame) {
              endpoint = "/games/";
            } else if (searchItem.isPlatform) {
              endpoint = "/platforms/";
            }
            if (searchItem.isCharacter) {
              endpoint = "/characters/";
            }
            return (
              <Link
                to={endpoint + searchItem.id}
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
            );
          })}
      </div>
    </div>
  );
};

export default SearchResult;
