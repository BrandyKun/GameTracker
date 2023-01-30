import React, { useEffect, useState } from "react";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import { changeImageSize } from "./Service";

const MansoryGallery = ({ screenshots }) => {
  let [count, setCount] = useState(0);
  const [firstImage, setFirstImage] = useState();
  const [images, setImages] = useState();

  // useEffect(() => {
  //   const getImg = () => {
  //     if (game != undefined) {
  //       const arrayOfImg = game?.screenshots?.values;
  //       const image = arrayOfImg[arrayOfImg.length - (arrayOfImg - 1)];
  //       const otherImages = arrayOfImg.splice(0, 1);

  //       setFirstImage(image);

  //       setImages(otherImages);
  //       console.log(otherImages);
  //       console.log(arrayOfImg);
  //       console.log(image);
  //     }
  //   }
  //   getImg();
  // }, [game]);

  // const getFirstImage = (images) => {
  //   const image = images[images.length - (images.length - 1)];
  //   console.log(image);
  // };
  return (
    <div className="gallery">
      {/* {game ? (
        <Gallery>
          <div className="mansory-container">
            {game?.screenshots?.values.map((scrs) => (
              <div id={"mans-" + count++}>
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
      )} */}
    </div>
  );
};

export default MansoryGallery;
