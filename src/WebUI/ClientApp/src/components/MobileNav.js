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

  useEffect(() => {
    const getNewStyle = () => {
      const nav = document.querySelector("nav");
            let scroll = nav.scrollTop;
            console.log(scroll);
      if (toggle) {
        if (!nav.classList.contains("scrolled-down")) {
           let scroll2 = nav.scrollTop;
            console.log('open',scroll);
          nav.classList.add("scrolled-down");
        }
      } else {
        if (nav.classList.contains("scrolled-down")) {
            let scroll1 = nav.scrollTop;
            console.log('closed', scroll);
          nav.classList.remove("scrolled-down");
        }
      }
    };
    getNewStyle();
  }, [toggle]);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const onScroll = (event) => {
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
      {toggle && (
        <div className="navbar-container navbar-container-mob-menu">
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
      )}
    </>
  );
};

export default MobileNav;
