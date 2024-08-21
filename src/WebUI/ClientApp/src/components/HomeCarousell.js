import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import SwiperCore from 'swiper/core';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import CarouselCard from "./CarouselCard";

const HomeCarousell = ({ gameList }) => {
  const [size, setSize] = useState(window.innerWidth);
  const [games, setGames] = useState(gameList || []);
  const swiperRef = useRef(null);  // Ref for the Swiper instance

  useEffect(() => {
    if (gameList) setGames(gameList);
  }, [gameList]);

  useLayoutEffect(() => {
    function updateWidth() {
      setSize(window.innerWidth);
      if (swiperRef.current) {
        swiperRef.current.swiper.update(); // Force Swiper to update
      }
    }

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const getSlidestoDisplay = () => {
    if (size > 1125) return 5;
    if (size > 1024) return 4;
    if (size > 768) return 3;
    if (size > 480) return 2;
    return 1;
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.update(); // Update Swiper on game list change
    }
  }, [games]);

  return (
    <div className="slider-container" >
      <Swiper
        ref={swiperRef}  // Attach ref to the Swiper component
        effect="coverflow"
        grabCursor={true}
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
        observer={true}
        observeParents={true}
      >
        {games.map((game) => (
          <SwiperSlide key={game.id} className="swiper-slide-centered">
            <CarouselCard key={game.id} game={game} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCarousell;
