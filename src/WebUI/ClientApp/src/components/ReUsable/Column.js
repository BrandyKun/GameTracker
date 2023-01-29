import React from "react";
import { changeImageSize } from "../Service";

const Column = ({ games, title }) => {

    const getDate = (dates)=> {
        const lastDate = dates.at(-1);
        let newDate = new Date(lastDate.date).toDateString();
        return newDate;
    }
  return (
    <div className="others-box recently-released">
      <h3 className="third-title">{title}</h3>
      {games?.map((game) => (
        <div  key= {game.id} className="game-card">
          <img
            src={changeImageSize(game.cover?.value.url, "t_720p")}
            alt={game.name}
          />
          <div className="info">
            <h4>{game.name}</h4>
            <span className="date">{getDate(game.releaseDates?.values)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Column;
