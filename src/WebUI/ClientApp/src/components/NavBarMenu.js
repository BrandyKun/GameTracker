import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

const NavBarMenu = () => {
  return (
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
            <input type="text" name="search" id="search-box" />

            <ul>
              <li>
                {" "}
                <Link to="/"> Home </Link>
              </li>
              <li>
                {" "}
                <Link to="/games"> Games </Link>
              </li>
              <li>
                {" "}
                <Link to="/login"> Login </Link>
              </li>
            </ul>
          </div>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
};

export default NavBarMenu;
