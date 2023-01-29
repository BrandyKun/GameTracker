import React, { useState } from "react";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import { changeImageSize } from "./Service";

const MansoryGallery = ({ game }) => {
  let [count, setCount] = useState(0);
  return (
    <div className="gallery">
      {game ? (
        <Gallery>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridTemplateRows: "repeat(5, 1fr)",
              gap: "10px 10px",
            }}
          >
            {game?.screenshots?.values.map((scrs) => (
              <div id={"mans-"+count++}>
                <Item
                  original={changeImageSize(scrs.url, "t_1080p")}
                  thumbnail={changeImageSize(scrs.url, "t_screenshot_med")}
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
              </div>
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
  );
};

export default MansoryGallery;
