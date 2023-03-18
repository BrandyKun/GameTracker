import React from "react";
import { Link } from "react-router-dom";
import { changeImageSize } from "./Service";

const CarouselCard = ({ game }) => {
  return (
    <div className="game-box">
      <Link to= {"/games/"+game.id}>
        <img
          className="game-cover"
          src={changeImageSize(game.cover?.value.url, "t_720p")}
          alt=""
        />
        <div className="game-name">
          <span>{game.name}</span>
        </div>
      </Link>
    </div>
  );
};

export default CarouselCard;
