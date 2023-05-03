import React, { useEffect, useLayoutEffect, useState } from "react";
import { getAsyncNoParams } from "./Service";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import CarouselCard from "./CarouselCard";
import Loader from "./ReUsable/Loader";

const HomeCarousell = ({ gameList }) => {
  const [size, setSize] = useState(475);
  const [games, setGames] = useState();

  useEffect(() => {
    if (gameList) setGames(gameList);
  }, [gameList]);

  useLayoutEffect(() => {
    function updateWidth() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);
  function getSlidestoDisplay() {
    var slides;

    if (size > 0) slides = 1;
    if (size > 480) slides = 2;
    if (size > 768) slides = 3;
    if (size > 1024) slides = 4;
    if (size > 1125) slides = 5;
    if (size > 1400) slides = 6;

    return slides;
  }
  return (
    <div className="slider">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={getSlidestoDisplay()}
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
      >
        {games?.map((game) => (
          <SwiperSlide key={game.id}>
            <CarouselCard key={game.id} game={game} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCarousell;
