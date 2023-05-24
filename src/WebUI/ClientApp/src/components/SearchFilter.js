import React, { useRef, useState } from "react";
import Dropdown from "./ReUsable/Dropdown";

const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const somedata = [
    'playstation 4',
    'playstation 5',
    'playstation 3',
    'playstation 2',
    'PSP',
    'Ps Vita'
  ]
  return (
    <div className="filter-container">
      <div className="filter">
        <div className="divider"></div>
        <div className="filters">
          <div ref={ref} className={`filter-type platforms ${isOpen ? "open" : ""}`}>
            <div className="text" onClick={() => setIsOpen(!isOpen)}>
              <p>Category</p>
              <p>
                View All <span> &gt;</span>
              </p>
            </div>
            <div className="dropdown-menu"></div>
          </div>
          <Dropdown title={'Platform'} data={somedata}/>
          <Dropdown />
          <Dropdown />
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
