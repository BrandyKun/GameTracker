import React, { useEffect, useState } from "react";
import { dateToMilliseconds } from "./Service";

const Game = () => {
  const [games, setGames] = useState();

  // const getGames = async () => {
  //   const res = await fetch("game/games", 
  //   { method: "POST", 
  //     headers: {
  //       'Accept': 'application/json, text/plain',
  //       'Content-Type': 'application/json;charset=UTF-8'
  //     },
  //     body:JSON.stringify( {
  //       query: "fields name,cover.*;",
  //       limit: 20
  //     })
  //   }).then((response) =>
  //     response.json()
  //   );
  //   return res;
  // };
  const getGames = async () => {
    const res = await fetch("game/newRelease", 
    { method: "POST", 
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body:JSON.stringify( {
        query: "fields date, created_at,game.*, human,platform, y;",
        limit: 20
      })
    }).then((response) =>
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
    // console.log(games, "this are the game");
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
