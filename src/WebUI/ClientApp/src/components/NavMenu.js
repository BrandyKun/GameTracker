import React, { Component, useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

const NavMenu = () => {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
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
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm mb-3"
        container
        light
      >
        <NavbarBrand tag={Link} to="/">
          WebUI
        </NavbarBrand>
        <NavbarToggler onClick={toggleMenu} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!toggle}
          navbar
        >
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/counter">
                Counter
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/fetch-data">
                Fetch data
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/games">
                Games
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/login">
                Login
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavMenu;
