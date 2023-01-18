import React from "react";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <div className="main">
        <nav className="filters">
          <select name="Platform" placeHolder="Select Platform" id="platforms"></select>
        </nav>
        <div className="games-container"></div>
      </div>
    </>
  );
};

export default Home;
