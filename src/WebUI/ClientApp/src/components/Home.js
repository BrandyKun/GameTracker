import React, { useContext, useEffect, useState } from "react";
import HomeCarousell from "./HomeCarousell";
import HomeColumns from "./HomeColumns";
import HomeInfo from "./HomeInfo";
import Platforms from "./Platforms";
import { getAsyncNoParams } from "./Service";
import Loader from "./ReUsable/Loader";
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
      try {
        const response = await getAsyncNoParams("game/popular");
        setGames(response);
      } catch (e) {
        console.error("popular:", e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const response = await getAsyncNoParams("game/awaiting");
        setUpcoming(response);
      } catch (e) {
        console.error("awaiting:", e);
      }
    }
    fetchUpcoming();
  }, []);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const response = await getAsyncNoParams("game/justReleased");
        setRecent(response);
      } catch (e) {
        console.error("justReleased:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecent();
  }, []);

  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : ( */}
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
          {/* {gameList?.map((game, index) => (
            <BatchAnimation  className={'test'} index ={index}
              children={<CarouselCard key={game.id} game={game} />}
            />
          ))}
          ; */}
        </div>

        <BatchAnimation children={
          <HomeInfo /> } >
        </BatchAnimation>
              <Platforms /> 
        <BatchAnimation children={
          <HomeColumns recentGames={recent} upcomingGames={upcoming} /> } >
        </BatchAnimation>
      </div>
      </>
      {/* )} */}
    </>
  );
};

export default Home;
