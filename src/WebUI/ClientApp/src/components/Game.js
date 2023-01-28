import React, { useEffect, useState } from "react";
import { getAsync, getAsyncNoParams } from "./Service";

const Game = () => {
  const [games, setGames] = useState();

  useEffect(() => {
    async function fetchData() {
      // console.log(games, "this are the game");
      const endpoint = "game/awaiting";
      // You can await here
      const response = await getAsyncNoParams(endpoint);
      // ...
      setGames(response);
    }
    fetchData();
  }, []);

  return (
    <div className="initial">
      <div className="contenitore">
        <div className="pagescreen"></div>
      </div>
      <div className="info-contenitore">
        <div className="info-box">
          <div className="first-col"></div>
          <div className="second-col"></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
