import React, { useEffect, useState } from "react";
import HomeCarousell from "./HomeCarousell";
import HomeColumns from "./HomeColumns";
import HomeInfo from "./HomeInfo";
import Platforms from "./Platforms";
import { getAsyncNoParams } from "./Service";
import Loader from "./ReUsable/Loader";

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
            <HomeInfo />
            <Platforms />
            <HomeColumns recentGames={recent} upcomingGames={upcoming} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
