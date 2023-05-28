import React, { useContext, useRef, useState } from "react";
import Dropdown from "./ReUsable/Dropdown";
import { GameContext } from "../context/GameContext";

const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { genreFilters, platformFilter,filterResults} = useContext(GameContext);
  const ref = useRef();

  const somedata = ["isGame", "isPlatform", "isCharacter"];
  return (
    <div className="filter-container">
      <div className="filter">
        <div className="divider"></div>
        <div className="filters">
          <div
            ref={ref}
            className={`filter-type platforms ${isOpen ? "open" : ""}`}
          >
            <div className="text" onClick={() => setIsOpen(!isOpen)}>
              <p>Category</p>
              <p>
                {isOpen ? "Close" : "View All"}
                <span> {isOpen ? "" : ">"}</span>
              </p>
            </div>
            <div className="dropdown-menu">
            <div className="check-container">
            <div className="col-items">
                  <input
                    type="checkbox"
                    name="Game"
                    id="isGame"
                    onChange={filterResults}
                    className={`game-checkbox`}
                  />
                  <label className="col-label" htmlFor="game">
                    Game
                  </label>
                </div>
            <div className="col-items">
                  <input
                    type="checkbox"
                    name="Platforms"
                    id="isPlatform"
                    onChange={filterResults}
                    className={`Platforms-checkbox`}
                  />
                  <label className="col-label" htmlFor="Platforms">
                    Platforms
                  </label>
                </div>
            <div className="col-items">
                  <input
                    type="checkbox"
                    name="Characters"
                    id="isCharacter"
                    onChange={filterResults}
                    className={`Characters-checkbox`}
                  />
                  <label className="col-label" htmlFor="Characters">
                    Characters
                  </label>
                </div>
            </div>
            </div>
          </div>
          <Dropdown title={"Platform"} data={platformFilter} />
          <Dropdown title={"Genres"} data={genreFilters} />
          <div className="filter-type sort">
            <div className="text">
              <p>Category</p>
              <p>
                View All <span> &gt; </span>
              </p>
            </div>
          </div>
        </div>
        <button> apply filter</button>
      </div>
    </div>
  );
};

export default SearchFilter;
