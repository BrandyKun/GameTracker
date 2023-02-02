import React, { useEffect, useState } from "react";
import MansoryGallery from "./MansoryGallery";
import { changeImageSize, getAsync, getAsyncNoParams } from "./Service";

const Game = () => {
  const [game, setGame] = useState();
  const [screenshots, setScreenshots] = useState();
  const [showMore, setShowMore] = useState(false);

  const text = `Embark on an epic and heartfelt journey as Kratos and Atreus
  struggle with holding on and letting go. Against a backdrop of
  Norse Realms torn asunder by the fury of the Aesir, they’ve been
  trying their utmost to undo the end times. But despite their
  best efforts, Fimbulwinter presses onward. Witness the changing
  dynamic of the father-son relationship as they fight for
  survival; Atreus thirsts for knowledge to help him understand
  the prophecy of “Loki”, as Kratos struggles to break free of his
  past and be the father his son needs. See for yourself how fate
  will force a choice upon them: between their own safety or the
  safety of the realms. All the while, hostile Asgardian forces
  assemble… Venture through all Nine Realms towards the prophesied
  battle that will end the world. Vanquish Norse gods and monsters
  alike in fluid, expressive combat. Explore in wonder through
  stunning mythological landscapes. Embark on an epic and
  heartfelt journey as Kratos and Atreus struggle with holding on
  and letting go. Against a backdrop of Norse Realms torn asunder
  by the fury of the Aesir, they’ve been trying their utmost to
  undo the end times. But despite their best efforts, Fimbulwinter
  presses onward. Witness the changing dynamic of the father-son
  relationship as they fight for survival; Atreus thirsts for
  knowledge to help him understand the prophecy of “Loki”, as
  Kratos struggles to break free of his past and be the father his
  son needs. See for yourself how fate will force a choice upon
  them: between their own safety or the safety of the realms. All
  the while, hostile Asgardian forces assemble… Venture through
  all Nine Realms towards the prophesied battle that will end the
  world. Vanquish Norse gods and monsters alike in fluid,
  expressive combat. Explore in wonder through stunning
  mythological landscapes.`;

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
                <div className="main-bo">
                  {showMore
                    ? game.storyline
                    : `${game.storyline.substring(0, 250)}`}
                  <button onClick={() => setShowMore(!showMore)}>
                    {showMore ? "show less" : "show More"}
                  </button>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
