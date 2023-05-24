import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchInput from "./ReUsable/SearchInput";
import { search } from "./Service";
import Loader from "../components/ReUsable/Loader";

const NavBarMenu = () => {
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isMobile, SetIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("click", onToggleMenu);
    return () => {
      window.removeEventListener("click", onToggleMenu);
    };
  }, [toggle]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    function checkSize() {
      if (window.innerWidth < 768) SetIsMobile(true);
    }
    window.addEventListener("resize", checkSize);
    checkSize();

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  const toggleMenu = (e) => {
    setToggle(!toggle);
  };
  const Search = async (e) => {
    setLoading(true);
    e.preventDefault();
    const searchBox = document.querySelector("#search-box-desktop");
    const searchValue = searchBox.value;
    const results = await search(searchValue);
    if (results) setLoading(false);
    document.body.style.overflow = "unset";
    navigate("/search", { state: { result: results, search: searchValue } });
  };
  const keyDownHandler = (e) => {
    if (e.keyCode === 13) Search(e);
  };

  const onToggleMenu = (event) => {
    const nav = document.querySelector("nav");
    const menu = document.querySelector("div#mobile.navbar-links");

    const navPosition = event.clientY;

    if (toggle) {
      document.body.style.overflow = "hidden";
      menu.style.visibility = "visible";
      // menu.style.display='block';
      if (!nav.classList.contains("scrolled-down")) {
        nav.classList.remove("closed");
        nav.classList.add("scrolled-down");
      }
    } else {
      nav.classList.add("closed");
      menu.style.visibility = "hidden";
      document.body.style.overflow = "unset";
      if (menu.classList.contains("closed") && navPosition < 50) {
        nav.classList.remove("scrolled-down");
      }
    }
  };

  //gets called on scroll to check where teh user in and change the menu to position fixed
  const onScroll = (event, e) => {
    const nav = document.querySelector("nav");

    const scrollPosition = event.target.scrollingElement.scrollTop;

    if (scrollPosition > 10) {
      if (!nav.classList.contains("scrolled-down")) {
        nav.classList.add("scrolled-down");
      }
    } else {
      if (nav.classList.contains("scrolled-down")) {
        nav.classList.remove("scrolled-down");
      }
    }
  };

  return (
    <>
      {!loading ? (
        <header>
          <nav>
            <div className="navbar-container">
              <Link className="navbar-logo" tag={Link} to="/">
                GameShelf
              </Link>
              {/* <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span> */}
              <div className="nav-icon" onClick={toggleMenu}>
                navigation
              </div>
              <div id={isMobile ? 'mobile': 'desktop'} className="navbar-links">
                <div className="searchbox-container">
                  <SearchInput
                    btnId={"desktop"}
                    classes={""}
                    keyUp={keyDownHandler}
                    onClick={Search}
                  />
                </div>
                <ul>
                  <li>
                    <Link to="/" onClick={toggleMenu}>
                      {" "}
                      Home{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/games" onClick={toggleMenu}>
                      {" "}
                      Games{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={toggleMenu}>
                      {" "}
                      Login{" "}
                    </Link>
                  </li>
                </ul>
                <div className="menu-footer">
                  <p>footer text</p>
                </div>
              </div>
            </div>
            {/* <MobileNav /> */}
          </nav>
        </header>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default NavBarMenu;
