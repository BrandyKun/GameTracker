import React, { useContext, useEffect, useState } from "react";
import HomeCarousell from "./HomeCarousell";
import HomeColumns from "./HomeColumns";
import HomeInfo from "./HomeInfo";
import Platforms from "./Platforms";
import { getAsyncNoParams } from "./Service";
import Loader from "./ReUsable/Loader";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "animate.css/animate.min.css";
import Modal from "./Modal";
import { GameContext } from "../context/GameContext";
import BatchAnimation from "./ReUsable/BatchAnimation";
import CarouselCard from "./CarouselCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [gameList, setGames] = useState();
  const [upcoming, setUpcoming] = useState();
  const [recent, setRecent] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // console.log(games, "this are the game");
      const endpoint = "game/popular";
      // You can await here
      const response = await getAsyncNoParams(endpoint);
      // ...
      setGames(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUpcoming() {
      const response = await getAsyncNoParams("game/awaiting");
      setUpcoming(response);
    }
    fetchUpcoming();
  }, []);
  useEffect(() => {
    async function fetchRecent() {
      const response = await getAsyncNoParams("game/justReleased"); //change endpoint
      setRecent(response);
      setLoading(false);
    }
    fetchRecent();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
      <div className="main">
        <nav className="filters"></nav>
        <div className="games-container">
          <h2> POPULAR GAMES</h2>
          <HomeCarousell gameList={gameList} />
        </div>
        <div  style={{
        height: "auto",
        width: "100%",
        maxWidth:'85%',
        margin: '0 auto',
        overflow: "hidden",
        display: 'flex',
        flexWrap: 'wrap',
      justifyContent: 'space-between'
      }} >
          {gameList?.map((game, index) => (
            <BatchAnimation  className={'test'} index ={index}
              children={<CarouselCard key={game.id} game={game} />}
            />
          ))}
          ;
        </div>

        <BatchAnimation children={
          <HomeInfo /> } >
        </BatchAnimation>
        {/* <BatchAnimation children={
              <Platforms /> } >
            </BatchAnimation> */}
        <BatchAnimation children={
          <HomeColumns recentGames={recent} upcomingGames={upcoming} /> } >
        </BatchAnimation>
      </div>
      </>
      )}
    </>
  );
};

export default Home;
