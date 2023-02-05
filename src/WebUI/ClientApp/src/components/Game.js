import React, { useEffect, useState } from "react";
import MansoryGallery from "./MansoryGallery";
import { changeImageSize, getAsync, getAsyncNoParams } from "./Service";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const Game = () => {
  const [game, setGame] = useState();
  const [screenshots, setScreenshots] = useState();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // console.log(games, "this are the game");
      const endpoint = "game/games/112875";
      const query =
        "fields name,cover.*, rating,release_dates.*, aggregated_rating, hypes, artworks.url,platforms.*, screenshots.url, similar_games.*, storyline,summary, url, videos.*, websites.*,collection,franchises.*,genres.*,language_supports.*; where id = 112875;";
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
      const endpoint = "game/screenshots/112875";
      const query = "fields url; where game = 112875;";
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
                  <div className="info-box"></div>
                  <div className="info-box"></div>
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
            <div className="info-box">
              <div className="videos">
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {game.videos?.values?.map((vr) => {
                    return (
                      <SwiperSlide>
                        <iframe width="420" height="315"
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
