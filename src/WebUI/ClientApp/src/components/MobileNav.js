import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "./ReUsable/MenuIcon";
import UserIcon from "./ReUsable/UserIcon";

const MobileNav = () => {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const toggleMenu = () => {
    setToggle(!toggle);
    console.log('open');
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
        <div className={`navbar-container navbar-container-mob-menu${toggle? "-open":""}` }>
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
      </div>
    </>
  );
};

export default MobileNav;
