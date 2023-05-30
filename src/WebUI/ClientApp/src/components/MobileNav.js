import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "./ReUsable/MenuIcon";
import UserIcon from "./ReUsable/UserIcon";
import SearchInput from "./ReUsable/SearchInput";
import Loader from "./ReUsable/Loader";
import { search } from "./Service";

const MobileNav = () => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleMenu = (e) => {
    setToggle(!toggle);
  };

  useEffect(() => {
    window.addEventListener("click", onToggleMenu);
    return () => {
      window.removeEventListener("click", onToggleMenu);
    };
  }, [toggle]);

  const onToggleMenu = (event) => {
    const nav = document.querySelector("nav");
    const menu = document.querySelector("navbar-links");

    const navPosition = event.clientY;

    if (toggle) {
      document.body.style.overflow = "hidden";
      // menu.style.displ
      if (!nav.classList.contains("scrolled-down")) {
        nav.classList.remove("closed");
        nav.classList.add("scrolled-down");
      }
    } else {
      nav.classList.add("closed");
      document.body.style.overflow = "initial";
      if (menu.classList.contains("close") && navPosition < 50) {
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

  const Search = async (e) => {
    setLoading(true);
    e.preventDefault();
    const searchBox = document.querySelector("#search-box-mobile");
    const searchValue = searchBox.value;
    const results = await search(searchValue);
    if (results) setLoading(false);
    setToggle();
    navigate("/search", { state: { result: results, search: searchValue } });
  };
  const keyDownHandler = (e) => {
    if (e.keyCode === 13) Search(e);
  };

  return (
    <>
      {!loading ? (
        <>
          <div className="navbar-container navbar-container-mob">
            <span className="menu-icon">
              <UserIcon />
            </span>
            <Link className="navbar-logo" to="/">
              MobileLogo
            </Link>
            <span className="menu-icon" onClick={toggleMenu}>
              <MenuIcon />
            </span>
          </div>
          <div
            id="mobileMenu"
            className={`navbar-container navbar-container-mob-menu${
              toggle ? "-open" : "-close"
            }`}
          >
            <div className="someclass">
              <div className="search-container">
                <SearchInput
                  btnId={"mobile"}
                  keyUp={keyDownHandler}
                  onClick={Search}
                  classes={"mobile-search"}
                />
              </div>
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
            <div className="menu-footer">
              <p>footer text</p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MobileNav;
