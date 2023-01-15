import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = () => {
  const [games, setGames] = useState();

  const getGames = async () => {
    const res = await fetch("game/games", { method: "Post", body: {
      "endpoint": "IGDBClient.Endpoints.Games",
      "query": "fields name,cover.*;",
      "limit": 20ææ
   } }).then((response) =>
      response.json()
    );
    return res;
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getGames();
      // ...
      setGames(response);
    }
    fetchData();
    console.log(games, "this are the game");
  }, [games]);

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
