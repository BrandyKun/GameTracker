import React, { useEffect, useState } from "react";
import { changeImageSize, getAsync, getAsyncNoParams } from "./Service";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";

const Game = () => {
  const [game, setGame] = useState();
  const [showMore, setShowMore] = useState(false);

  const smallItemStyles = {
    cursor: "pointer",
    objectFit: "cover",
    width: "100%",
    maxHeight: "100%",
  };

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
        "fields name,cover.*, rating,release_dates.*, aggregated_rating, hypes, artworks.url,platforms.*, screenshots.url, similar_games.*, storyline,url, videos.*, websites.*,collection,franchises.*,genres.*,language_supports.*; where id = 112875;";
      const limit = "1";
      const date = "";
      const response = await getAsync(endpoint, query, date, limit);
      // ...
      console.log(response.screenshots);
      setGame(response);
    }
    fetchData();
  }, []);

  return (
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
                  src="https://d2d2z3qzqjizpf.cloudfront.net/eyJidWNrZXQiOiJnZ2FwcCIsImtleSI6Im1lZGlhL2dhbWVzL1VqQ1plZy81YzU5NTJiYy05ZDY2LTQzZjgtYThiNS01NzQxYjQ0ZDk0YmIuanBlZyIsImVkaXRzIjp7InRvRm9ybWF0IjoianBnIiwianBlZyI6eyJxdWFsaXR5Ijo4MCwiY2hyb21hU3Vic2FtcGxpbmciOiI0OjQ6NCJ9LCJyZXNpemUiOnsid2lkdGgiOjU2MH19fQ=="
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
              {showMore ? text : `${text.substring(0, 250)}`}
              <button onClick={() => setShowMore(!showMore)}>
                {showMore ? "show less" : "show More"}
              </button>
            </div>
            <div className="main-bo">
              <div className="gallery">
                {game ? (
                  <Gallery>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.4fr 0.8fr 0.8fr",
                        gridTemplateRows: "1fr 1fr",
                        gap: "10px 10px",
                        gridTemplateAreas: `. . .
                      . . .`,
                      }}
                    >
                      {game?.screenshots?.values.map((scrs) => (
                        <Item
                          original={changeImageSize(scrs.url, "t_1080p")}
                          thumbnail={changeImageSize(
                            scrs.url,
                            "t_screenshot_med"
                          )}
                          width="1600"
                          height="1068"
                          alt="Photo of seashore by Folkert Gorter"
                        >
                          {({ ref, open }) => (
                            <img
                              style={{ cursor: "pointer" }}
                              // src={scrs.url}
                              src={changeImageSize(scrs.url, "t_logo_med")}
                              onClick={open}
                            />
                          )}
                        </Item>
                      ))}
                    </div>
                  </Gallery>
                ) : (
                  <Gallery>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "240px 171px 171px",
                        gridTemplateRows: "114px 114px",
                        gridGap: 12,
                      }}
                    >
                      <Item
                        original="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
                        thumbnail="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
                        width="1600"
                        height="1600"
                        alt="Photo of seashore by Folkert Gorter"
                      >
                        {({ ref, open }) => (
                          <img
                            style={{ cursor: "pointer" }}
                            src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
                            onClick={open}
                          />
                        )}
                      </Item>
                    </div>
                  </Gallery>
                )}
              </div>
            </div>
            <div className="main-bo"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
