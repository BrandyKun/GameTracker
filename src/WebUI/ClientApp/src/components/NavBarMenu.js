import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import MobileNav from "./MobileNav";
import { getAsync, search } from "./Service";
import Loader from "../components/ReUsable/Loader";

const NavBarMenu = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const Search = async (e) => {
    setLoading(true);
    e.preventDefault();
    const searchBox = document.querySelector("#search-box");
    const searchValue = searchBox.value;
    const results = await search(searchValue);
    if (results) setLoading(false);
    navigate("/search", { state: { result: results, search: searchValue } });
  };

  const keyDownHandler = (e) => {
    if (e.keyCode === 13) Search(e);
  };
  return (
    <>
      {!loading ? (
        <header>
          <nav>
            <div className="navbar-container">
              <Link className="navbar-logo" tag={Link} to="/">
                Some Logo
              </Link>
              {/* <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span> */}
              <div className="navbar-links">
                <div className="searchbox-container">
                  <input
                    type="text"
                    name="search"
                    id="search-box"
                    onKeyUp={keyDownHandler}
                  />
                  <button type="submit" onClick={Search} className="search-btn">
                    <IconContext.Provider value={{ className: "search-icon" }}>
                      <BiSearchAlt />
                    </IconContext.Provider>
                  </button>
                </div>
                <ul>
                  <li>
                    <Link to="/"> Home </Link>
                  </li>
                  <li>
                    <Link to="/games"> Games </Link>
                  </li>
                  <li>
                    <Link to="/login"> Login </Link>
                  </li>
                </ul>
              </div>
            </div>
            <MobileNav />
          </nav>
        </header>
      ) : (
        <Loader />
      )}{" "}
    </>
  );
};

export default NavBarMenu;
