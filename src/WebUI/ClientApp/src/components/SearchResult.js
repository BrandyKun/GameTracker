import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import SearchFilter from "./SearchFilter";
import { changeImageSize, getAsync } from "./Service";

const SearchResult = () => {
  const { searchResults, setSearchResults } = useContext(GameContext);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      if (location.state) {
        if (location.state.type === "platform") {
          // Fetch games for the platform
          const query = `fields *; where platform_family = (${location.state.platformId});`;
          var endpoint = 'game/platformGames';
          const response = await getAsync(endpoint, query);
          console.log(response);
          setSearchResults(response);
        } else if (location.state.result) {
          // Handle regular search results
          setSearchResults(location.state.result);
        }
      }
    };
    fetchResults();
  }, [location, setSearchResults]);

  return (
    <>
      <div className="searchContainer">
        <h3 className="resultTitle">
          {location.state?.type === "platform"
            ? `Games for ${location.state.platformName}`
            : `Results for: "${location.state?.search?.toUpperCase()}"`}
        </h3>
        <div className="results-container">
          <SearchFilter />
          <div className="search-results">
            {searchResults && searchResults.map((searchItem) => {
              let endpoint = "";
              if (searchItem.isGame) {
                endpoint = "/games/";
              } else if (searchItem.isPlatform) {
                endpoint = "/platforms/";
              } else if (searchItem.isCharacter) {
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
