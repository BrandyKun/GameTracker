import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "./ReUsable/MenuIcon";
import UserIcon from "./ReUsable/UserIcon";

const MobileNav = () => {
  const [toggle, setToggle] = useState(false);

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
  }, []);

  const onToggleMenu = (event) => {
    const nav = document.querySelector("nav");

    const navPosition = event.clientY;
    if (toggle) {
      if (!nav.classList.contains("scrolled-down")) {
        nav.classList.remove("closed");
        nav.classList.add("scrolled-down");
      }
    } else {
      nav.classList.remove("scrolled-down");

      nav.classList.add("closed");

    //   if (!(nav.classList.contains("open")) &&  navPosition < 50) {
    //     nav.classList.remove("scrolled-down");
    //   }
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
        className={`navbar-container navbar-container-mob-menu${
          toggle ? "-open" : "-close"
        }`}
        style={{}}
      >
        <ul>
          <li>
            {" "}
            <Link to="/"> Home </Link>
          </li>
          <li>
            {" "}
            <Link to="/counter"> Counter </Link>
          </li>
          <li>
            {" "}
            <Link to="/fetch-data"> Fetch Data </Link>
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
    </>
  );
};

export default MobileNav;
