import React, { useEffect, useState } from "react";
import { dateToMilliseconds, getAsync } from "./Service";

const Game = () => {
  const [games, setGames] = useState();


  useEffect(() => {
    async function fetchData() {
      // console.log(games, "this are the game");
      const endpoint = "game/newRelease";
      const query = "fields date, created_at,game.*, human,platform, y;";
      // You can await here
      const response = await getAsync(endpoint, query, 20);
      // ...
      setGames(response);
    }
    fetchData();
  }, []);

  return (
    <>
      <div>Game</div>
      <div>
        {games?.map((item) => (
          <div>
            <p>
              {" "}
              {item.id}, {item.name}
            </p>
            <img src={item.cover?.value?.url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
