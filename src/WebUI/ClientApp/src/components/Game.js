import React, { useEffect, useState } from "react";
import MansoryGallery from "./MansoryGallery";
import { changeImageSize, getAsync, getAsyncNoParams } from "./Service";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper";

const Game = ({gameId}) => {
  const [game, setGame] = useState();
  const [screenshots, setScreenshots] = useState();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // console.log(games, "this are the game");
      const endpoint = `game/games/${gameId}`;
      const query =
        `fields name,cover.*, bundles,dlcs.*,rating,first_release_date,franchise, release_dates.*, aggregated_rating, involved_companies.*, multiplayer_modes.*,hypes,parent_game.*, artworks.url,platforms.*, screenshots.url, similar_games.*, storyline,summary, url, videos.*, websites.*,collection,franchises.*,franchise,genres.*,language_supports.*; where id = ${gameId};`;
      const limit = "1";
      const date = "";
      const response = await getAsync(endpoint, query, date, limit);
      // ...
      console.log(response, "game");
      setGame(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      // console.log(games, "this are the game");
      const endpoint = `game/screenshots/${gameId}`;
      const query = `fields url; where game = ${gameId};`;
      const limit = "20";
      const date = "";
      const response = await getAsync(endpoint, query, date, limit);
      // ...
      setScreenshots(response);
    }
    fetchData();
  }, []);

  return (
    <>
      {game && (
        <div className="initial">
          <div className="contenitore">
            <div className="pagescreen"></div>
          </div>
          <div className="info-contenitore">
            <div className="info-box">
              <div className="first-col">
                <div className="info-col">
                  <div className="img-container">
                    <img
                      src={changeImageSize(game.cover.value.url, "t_720p")}
                      alt=""
                      className="card-info"
                    />
                  </div>
                  <div className="info-box__random">
                    <p>releaseDate: <span>{new Date(game.firstReleaseDate).toDateString()}</span></p>
                    <p>genres: <span>{game.genres?.values.map((item)=> ( 
                      <span> {item.name}</span>
                    ))}</span></p>
                      <p>platforms: </p>
                  </div>
                  <div className="info-box">

                  </div>
                </div>
              </div>
              <div className="second-col">
                <div className="main-bo">
                  <h2> God Of War: Ragnarök </h2>
                </div>
                <div className="main-bo desc">
                  <p style={{ textOverflow: showMore ? "" : "ellipsis" }}>
                    {showMore
                      ? game.storyline
                      : `${game.storyline.substring(0, 500)}...`}
                  </p>
                  <span onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Show less" : "Show More"}
                  </span>
                </div>
                <div className="main-bo">
                  {screenshots ? (
                    <MansoryGallery screenshots={screenshots} />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="main-bo"></div>
              </div>
            </div>
            <div className="info-box__videos">
              <div className="videos">
                <Swiper
                  slidesPerView={2}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  navigation={true}
                  modules={[Navigation, Pagination]}
                  className="mySwiper"
                >
                  {game.videos?.values?.map((vr) => {
                    return (
                      <SwiperSlide>
                        <iframe width="100%" height="500"
                          src={`https://www.youtube.com/embed/${vr.videoId}`}
                        ></iframe>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
