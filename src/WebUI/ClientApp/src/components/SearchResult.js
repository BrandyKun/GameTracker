import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import SearchFilter from "./SearchFilter";
import { changeImageSize, getAsync } from "./Service";
import Loader from "./ReUsable/Loader";

const SearchResult = () => {
  const { searchResults, setSearchResults } = useContext(GameContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
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
      setLoading(false)
    };
    fetchResults();
  }, [location, setSearchResults]);

  return (
    <>
    {!loading ? (
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
                    <div className="overlay" /> {/* New overlay div */}
                    <span className="hover-text">{searchItem.name}</span> {/* New text element */}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
    </div>): (<Loader/>)} 
    </>
  );
};

export default SearchResult;
