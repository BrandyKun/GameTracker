import React from "react";
import Dropdown from "./UI/Dropdown";

const Home = () => {

  const options = [
    { value: "green", label: "Green"},
    { value: "blue", label: "Blue"},
    { value: "red", label: "Red"},
  ]
  return (
    <>
      <div>Home</div>
      <div className="main">
        <nav className="filters">
          <Dropdown placeHolder="Select" options={options}/>
        </nav>
        <div className="games-container">
          <div className="game.page">
            <img src="" alt="" />
            <div className="game_title"></div>
            <span className="game_release"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
