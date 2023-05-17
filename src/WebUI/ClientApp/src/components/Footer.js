import React from "react";

const Footer = () => {
  return (
    <div className="footerContainer">
      <footer
        style={{ width: "100%", height: "400px", backgroundColor: "#181A24" }}
        className="top"
      >
        {/* <img src="logo.svg" /> */}

        Some Logo
        <div class="links">
          <div>
            <h2>Platform</h2>
            <a>Directus Core</a>
            <a>Open Data Platform</a>
            <a>Feature List</a>
            <a>Road Map</a>
            <a>Marketplace</a>
          </div>
          <div>
            <h2>Cloud</h2>
            <a>Dashboard</a>
            <a>Register</a>
            <a>Pricing</a>
            <a>System Status</a>
            <a>Partner Program</a>
          </div>
        </div>
      </footer>
      <footer class="bottom">
        <div class="legal">
          <span> © 2023 All rights reserved </span>
          <a> License </a>
          <a> Terms </a>
          <a> Privacy </a>
        </div>
        <div class="links">
          <a class="fa-brands fa-github"></a>
          <a class="fa-brands fa-linkedin"></a>
          <a class="fa-brands fa-docker"></a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
