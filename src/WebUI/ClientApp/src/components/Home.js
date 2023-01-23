import React from "react";
import { Form } from "reactstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Home = () => {
  const options = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
  ];
  return (
    <>
      <div>Home</div>
      <div className="main">
        <nav className="filters"></nav>
        <div className="games-container">
          <div className="slider">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"4"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              loop={true} 
              loopFillGroupWithBlank={true}
            >
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="game-box">
                  <a href="">
                    <div className="img">
                      <img
                        class="game-cover"
                        src="https://static-cdn.jtvnw.net/ttv-boxart/1842715404_IGDB-285x380.jpg"
                        alt=""
                      />
                    </div>
                    <div className="game-name">
                      <span>Game title</span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="game-page">
            <img src="" alt="" />
            <div className="game_title"></div>
            <span className="game_release"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
