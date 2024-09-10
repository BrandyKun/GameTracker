import React, { useContext, useEffect, useState, useCallback } from "react";
import MansoryGallery from "./MansoryGallery";
import { changeImageSize, getAsync, getByIdAsync } from "./Service";
import { GameContext } from "../context/GameContext";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { useParams } from "react-router-dom";
import Loader from "./ReUsable/Loader";
import Modal from "./Modal";

const Game = () => {
  const [game, setGame] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setGameId] = useState(null);
  const [backGroundImage, setBackGroundImage] = useState("");
  const [storyLine, setStory] = useState("");
  const { gameId } = useParams();
  const {
    screenshots,
    setScreenshots,
    toggleModal,
    imageIndex,
    selectedImage,
    showModal,
  } = useContext(GameContext);

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [gameId]);

  const fetchGameData = useCallback(async () => {
    if (id) {
      try {
        setLoading(true);
        setError(null);
        const endpoint = `game/games/${id}`;
        const response = await getByIdAsync(endpoint, id);
        setGame(response);
        setScreenshots([]); // Clear screenshots when fetching new game data
      } catch (err) {
        setError("Failed to fetch game data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [id, setScreenshots]);

  const fetchScreenshots = useCallback(async () => {
    if (game && game.id) {
      try {
        const endpoint = `game/screenshots/${game.id}`;
        const query = `fields *, game.*; where game=${game.id};`;
        const limit = "20";
        const date = "";
        const response = await getAsync(endpoint, query, date, limit);
        setScreenshots(response);
      } catch (err) {
        console.error("Failed to fetch screenshots:", err);
      }
    }
  }, [game, setScreenshots]);

  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]);

  useEffect(() => {
    if (game) {
      fetchScreenshots();
    }
  }, [game, fetchScreenshots]);

  useEffect(() => {
    const getRandomImage = () => {
      let bckImageToDisplay = "";
      let randomNumberInArrayRange = 0;
      if (game?.screenshots?.values) {
        randomNumberInArrayRange = Math.floor(
          Math.random() * game?.screenshots?.values.length
        );
        bckImageToDisplay = game?.screenshots?.values[randomNumberInArrayRange];
        bckImageToDisplay = bckImageToDisplay.url;
      } else if (game?.artworks?.values) {
        randomNumberInArrayRange = Math.floor(
          Math.random() * game.artworks?.values.length
        );
        bckImageToDisplay = game.artworks?.values[randomNumberInArrayRange].url;
      }
      bckImageToDisplay = changeImageSize(bckImageToDisplay, "t_1080p");
      setBackGroundImage(bckImageToDisplay);
    };

    getRandomImage();
  }, [game]);

  useEffect(() => {
    const getDescription = () => {
      let story = "";
      if (game?.storyline !== null && game?.storyline !== undefined) {
        story = game?.storyline;
      } else if (game?.summary !== null && game?.summary !== undefined) {
        story = game?.summary;
      } else {
        story = "no description available at the moment";
      }
      setStory(story);
      setLoading(false);
    };

    getDescription();
  }, [game]);

  function getSlides() {
    var slides = window.innerWidth <= 760 ? 1 : 2;
    return slides;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) {
    return <div>No game data available</div>;
  }

  return (
    <>
      {game && (
        <div className="initial">
          <div className="contenitore">
            <div
              className="pagescreen"
              style={{
                backgroundImage: "url(" + `${backGroundImage}` + ")",
              }}
            ></div>
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
                          <td className="info-title"> Release Date: </td>
                          <td>
                            {" "}
                            {new Date(game.firstReleaseDate).toDateString()}
                          </td>
                        </tr>
                        <tr>
                          <td className="info-title">Genres:</td>
                          <td>
                            <ul>
                              {game.genres?.values.map((item) => (
                                <li key={item.id}> {item.name}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="info-title">Platforms:</td>
                          <td>
                            <ul>
                              {game.platforms?.values.map((item) => (
                                <li key={item.id}> {item.name}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="info-title">Perspectives:</td>
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
                    <a
                      className="website-link"
                      src={game.websites?.values[0].url}
                      href={game.websites?.values[0].url}
                    >
                      {game.name}
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
                    {showMore ? storyLine : `${storyLine.substring(0, 500)}...`}
                  </p>
                  <span onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Show less" : "Show More"}
                  </span>
                </div>
                <div className="main-bo">
                  {screenshots && screenshots.length > 0 ? (
                    <MansoryGallery screenshots={screenshots} />
                  ) : (
                    <p>No screenshots available</p>
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
                  spaceBetween={5}
                >
                  {game.videos?.values?.map((vr) => {
                    return (
                      <SwiperSlide key={vr.id}>
                        <iframe
                          className="youtube-iframe"
                          src={`https://www.youtube.com/embed/${vr.videoId}?color=white"`}
                        ></iframe>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          {showModal && (
            <Modal
              toggleModal={toggleModal}
              imageIndex={imageIndex}
              selectedImage={selectedImage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Game;
