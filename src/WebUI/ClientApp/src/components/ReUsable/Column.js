import React from "react";
import { changeImageSize } from "../Service";
import { Link } from "react-router-dom";

const Column = ({ games, title }) => {

    const getDate = (dates)=> {
        const lastDate = dates.at(-1);
        let newDate = new Date(lastDate.date).toDateString();
        return newDate;
    }
  return (
    <div className="others-box recently-released">
      <h3 className="third-title"><span>{title}</span></h3>
      {games?.map((game) => (
        <Link to= {"/games/"+game.id}  key= {game.id} className="game-card">
          <img
            src={changeImageSize(game.cover?.value.url, "t_720p")}
            alt={game.name}
          />
          <div className="info">
            <h4>{game.name}</h4>
            <span className="date">{getDate(game.releaseDates?.values)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Column;
