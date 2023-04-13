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
import { useParams } from "react-router-dom";

const Game = ({}) => {
  const [game, setGame] = useState();
  const [screenshots, setScreenshots] = useState();
  const [showMore, setShowMore] = useState(false);
  const [id, setGameId] = useState();
  const [backGroundImage, setBackGroundImage] = useState();
  const [storyLine, setStory] = useState();
  const { gameId } = useParams();

  useEffect(() => {
    if (gameId != null && gameId != undefined) {
      setGameId(gameId);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (id != undefined) {
        const endpoint = `game/games/${id}`;
        const query = `fields name,cover.*, bundles,dlcs.*,rating,first_release_date,franchise, release_dates.*, aggregated_rating, involved_companies.*, player_perspectives.*, multiplayer_modes.*,hypes,parent_game.*, artworks.url,platforms.*, screenshots.url, similar_games.*, storyline,summary, url, videos.*, websites.*,collection,franchises.*,franchise,genres.*,language_supports.*; where id = ${id};`;
        const limit = "1";
        const date = "";
        const response = await getAsync(endpoint, query, date, limit);
        // ...
        console.log(response, "game");
        setGame(response);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchScreenshoots() {
      // console.log(games, "this are the game");
      const endpoint = `game/screenshots/${id}`;
      const query = `fields url; where game = ${id};`;
      const limit = "20";
      const date = "";
      const response = await getAsync(endpoint, query, date, limit);
      // ...
      setScreenshots(response);
    }
    fetchScreenshoots();
  }, [id]);

  useEffect(() => {
    const getRandomImage = () => {
      let bckImageToDisplay  =  '';
      let randomNumberInArrayRange = 0;
      if (screenshots != null && screenshots != undefined) {
        randomNumberInArrayRange = Math.floor(Math.random() * (screenshots.length + 1));
        bckImageToDisplay = screenshots[randomNumberInArrayRange].url;
      }
      else if( game?.artworks?.values != null && game.artworks?.values != undefined )
      {
        randomNumberInArrayRange = Math.floor(Math.random() * (game.artworks?.values.length + 1));
        bckImageToDisplay = game.artworks?.values[randomNumberInArrayRange];
      }
      bckImageToDisplay = changeImageSize(bckImageToDisplay, "t_1080p");
      setBackGroundImage( bckImageToDisplay);
    };

    getRandomImage();
  }, [game]);
  
  useEffect(() => {
    const getDescription =() =>{
      let story = '';
      if(game?.storyline != null && game?.storyline != undefined)
      {
        story = game?.storyline;
      }
      else if( game?.summary != null && game?.summary != undefined)
      {
        story = game?.summary;
      }
      else{
        story='no description available at the moment'
      }
      setStory(story);
    };
  
    getDescription()
    
  }, [game]);

  function getSlides() {
    var slides = window.innerWidth <= 760 ? 1 : 2;
    return slides;
  }
  

  return (
    <>
      {game && (
        <div className="initial">
          <div className="contenitore">
            <div className="pagescreen" style={{backgroundImage: "url("+`${backGroundImage}`+")"}}></div>
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
                    <table>
                    <tbody>
                      <tr>
                        <td> Release Date: </td>
                        <td>
                          {" "}
                          {new Date(game.firstReleaseDate).toDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>Genres:</td>
                        <td>
                          <ul>
                            {game.genres?.values.map((item) => (
                              <li key={item.id}> {item.name}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>Platforms:</td>
                        <td>
                          <ul>
                            {game.platforms?.values.map((item) => (
                              <li key={item.id}> {item.name}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>Perspectives:</td>
                        <td>
                          <ul>
                            {game.playerPerspectives?.values.map((item) => (
                              <li key={item.id}> {item.name}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <a src={game.websites?.values[0].url}>
                      {" "}
                      website {game.name}{" "}
                    </a>
                  </div>
                  <div className="info-box"></div>
                </div>
              </div>
              <div className="second-col">
                <div className="main-bo">
                  <h2> {game.name} </h2>
                </div>
                <div className="main-bo desc">
                  <p style={{ textOverflow: showMore ? "" : "ellipsis" }}>
                    {showMore
                      ? storyLine
                      : `${storyLine.substring(0, 500)}...`}
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
                  slidesPerView={getSlides()}
                  loop={true}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {game.videos?.values?.map((vr) => {
                    return (
                      <SwiperSlide key={vr.id}>
                        <iframe
                          width="95%"
                          height="450"
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
