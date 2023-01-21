import React, { useEffect, useState } from "react";
import { dateToMilliseconds, getAsync, getAsyncNoParams} from "./Service";

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

  // useEffect(() => {
  //   async function fetchData() {
  //     // console.log(games, "this are the game");
  //     const endpoint = "game/games";
  //     const query = "fields name,cover.*, rating,release_dates.*,aggregated_rating,  hypes,artworks.url,platforms.*; where rating > 75 & hypes > 8 & category =0  & release_dates.date > 1641069960000 & platforms= (167,48); sort rating desc;";
  //     const date ="1641069960000"
  //     // You can await here
  //     const response = await getAsync(endpoint, query,date, 30);
  //     console.log(response);
  //     // ...
  //     setGames(response);
  //   }
  //   fetchData();
  // }, []);


  //1641069960000
  return (
    <>
      <div>Game</div>
      <div>
        {games?.map((item) => (
          <div>
            <p>
              {" "}
              {item.rating}, {item.name}
            </p>
            <p>{item.releaseDate}</p>
            <img src={item.cover?.value?.url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
