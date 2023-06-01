import React, { useContext, useEffect, useState,useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { changeImageSize } from "./Service";
import { GameContext } from "../context/GameContext";
import SearchFilter from "./SearchFilter";

const SearchResult = () => {
  // const [searchResults, setSearchResults] = useState();
  const { searchResults, setSearchResults, filter, filterResults} = useContext(GameContext);
  // const [filter, SetFilter] = useState([]);
  const [diplays, searchToShow] = useState([]);

  const state = useLocation();

  useEffect(() => {
    const getResults = () => {
      if (state !== null && state !== undefined) {
        console.log(state.state.result);
        setSearchResults(state.state.result);
      }
    };
    getResults();
  }, [state]);

  useEffect(() => {
    const filterTheResults = () => {
      /**
       * Only bring back searchResults that have isGame: true
       */
      let filteredResults = [];
      if (searchResults && filter.length > 0) {
        filteredResults.push(
          searchResults.filter((result) => {
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
      } else if (searchResults) {
        filteredResults.push(searchResults);
        searchToShow(...filteredResults);
      }
    };
    filterTheResults();
  }, [filter, searchResults]);

  useLayoutEffect(() => {
    const filter = document.querySelector('.filter-container');
    if(window.innerWidth < 768)
    {
      filter.style.display = 'none'
    }
  
    return () => {
     
    };
  }, [])

  const openFilter = (e) => {
    e.preventDefault();
    const filter = document.querySelector('.filter-container');
    const body = document.querySelector('body');
    console.log(body);
    if(filter.style.display == 'none')
    {
      body.style.overflow = 'hidden';
      filter.style.display = 'block';
    }
  
  }
  // const filterResults = (e) => {
  //   //To Do
  //   let boolName = e.target.id;
  //   let filterToSet = [...filter];
  //   let classToToggle = document.querySelector(`#${boolName}`);
  //   //if filter has e.text = remove it if not add it. then filter the searchResults based if isgame etch and return that
  //   if (!filterToSet.includes(boolName)) {
  //     filterToSet.push(boolName);
  //     classToToggle.classList.add("active");
  //   } else {
  //     let foundIndex = filterToSet.indexOf(boolName);
  //     if (foundIndex > -1) filterToSet.splice(foundIndex, 1);
  //     classToToggle.classList.remove("active");
  //   }
  //   SetFilter(filterToSet);
  //   console.log(filter);
  // };

  /**
   * Only bring back searchResults that have isGame: true
   */

  // const filteredResults = searchResults.filter((result) => {
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
    <>
      <div className="searchContainer">
        <h3 className="resultTitle">
          {" "}
          Results for: " {state.state.search.toUpperCase()} "
        </h3>

        {/* <div className="filters-container">
          <button
            className="filter-btn filter-btn-character"
            id="isCharacter"
            onClick={openFilter}
          >
            Filter
          </button> 
        </div>*/}
        <div className="results-container">
          <SearchFilter />
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
      </div>
    </>
  );
};

export default SearchResult;
