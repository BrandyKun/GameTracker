import React from "react";

const CarouselCard = ({ game }) => {

  const changeImageSize =(url) => {
    let newURL = url.replace(/t_thumb/, "t_720p");
    return newURL;
  }
  return (
    <div className="game-box">
      <a href="#">
        <img className="game-cover" src={changeImageSize(game.cover?.value.url)} alt="" />
        <div className="game-name">
          <span>{game.name}</span>
        </div>
      </a>
    </div>
  );
};

export default CarouselCard;
