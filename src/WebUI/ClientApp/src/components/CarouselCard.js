import React from "react";
import { changeImageSize } from "./Service";

const CarouselCard = ({ game }) => {

  
  return (
    <div className="game-box">
      <a href="#">
        <img className="game-cover" src={changeImageSize(game.cover?.value.url, 't_720p')} alt="" />
        <div className="game-name">
          <span>{game.name}</span>
        </div>
      </a>
    </div>
  );
};

export default CarouselCard;
