import React from "react";
import HomeCarousell from "./HomeCarousell";
import HomeColumns from "./HomeColumns";
import HomeInfo from "./HomeInfo";
import Platforms from "./Platforms";

const Home = () => {
  return (
    <>
      <div className="main">
        <nav className="filters"></nav>
        <div className="games-container">
          <h2> POPULAR GAMES</h2>
          <HomeCarousell />
        </div>
        <HomeInfo />
        <Platforms />
        <HomeColumns />
      </div>
    </>
  );
};

export default Home;
