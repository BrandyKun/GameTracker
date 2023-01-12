import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = () => {
  const [games, setGames] = useState();

  const getGames = async () => {
    const res = await fetch("game", { method: "Post" }).then((response) =>
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
    console.log(games, 'this are the game')
  }, [games]);

  return (
    <>
      <div>Game</div>
      <div>
        {games?.map((item) => (
          <p>
            {" "}
            {item.id}, {item.name}
          </p>
        ))}
      </div>
    </>
  );
};

export default Game;
