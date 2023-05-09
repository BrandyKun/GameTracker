import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { search } from "../Service";

const SearchInput = ({ btnId, keyUp, classes, ...otherProps }) => {
  
  return (
    <>
      <input
        type="text"
        name="search"
        id={`search-box-${btnId}`}
        onKeyUp={keyUp}
      />
      <button type="submit" {...otherProps} className={`search-btn ${classes}`}>
        <IconContext.Provider value={{ className: "search-icon" }}>
          <BiSearchAlt />
        </IconContext.Provider>
      </button>
    </>
  );
};

export default SearchInput;
