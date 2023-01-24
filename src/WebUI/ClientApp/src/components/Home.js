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
        </div>
        <section class="section-about">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">
            Create a list 
          </h2>
        </div>
        <div class="row">
          <div class="col-1-of-2">
            <h3 class="heading-tertiary u-margin-bottom-small">
              save ytour favourite games
            </h3>
            <p class="paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              eius eveniet, sit perferendis possimus iure laudantium obcaecati
              quisquam quos optio!
            </p>
            <h3 class="heading-tertiary u-margin-bottom-small">
             leave reviews
            </h3>
            <p class="paragraph">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              odit quis nihil, minus asperiores, dolorum omnis ad nisi quod ex
              recusandae suscipit rerum quia facere.
            </p>

            <a href="#" class="btn-text">Learn more &rarr;</a>
          </div>
          <div class="col-1-of-2">
            <div class="composition">
              <img
                src="https://blog.playstation.com/uploads/2022/12/a90bb22a521f0155b762c59d63e618829ea26cd2.jpeg"
                alt="photo 1"
                class="composition__photo composition__photo--p1"
              /><img
                src="https://assets-prd.ignimgs.com/2022/01/21/spiderman2ps-sq-1642799668042.jpg"
                alt="photo 2"
                class="composition__photo composition__photo--p2"
              /><img
                src="https://cdn-hogwartslegacy.warnerbrosgames.com/retail/standard/en/pack.jpg"
                alt="photo 3"
                class="composition__photo composition__photo--p3"
              />
            </div>
          </div>
        </div>
      </section>

      </div>
    </>
  );
};

export default Home;
