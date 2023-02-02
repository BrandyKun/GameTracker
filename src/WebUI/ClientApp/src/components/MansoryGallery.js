import React, { useEffect, useState } from "react";

import { changeImageSize } from "./Service";
import Modal from "./Modal";

const MansoryGallery = ({ screenshots }) => {
  const [firstImage, setFirstImage] = useState();
  const [images, setImages] = useState();
  const [selectedImage, setImageClicked] = useState();
  const [showModal, setModal] = useState(false);

  const toggleModal = (image) => {
    setImageClicked(image);
    setModal(!showModal);
  };

  useEffect(() => {
    const getImg = () => {
      if (screenshots != null && screenshots != undefined) {
        const arrayOfImg = screenshots;
        const image = arrayOfImg[arrayOfImg.length - (arrayOfImg.length)];
        console.log(image)
        setFirstImage(image);
      }
    };
    getImg();
  }, []);

  useEffect(() => {
    const getOtherImg = () => {
      let galleryImg = [];
      for (let i = 1; i < 5; i++) {
        galleryImg.push(screenshots[i]);
      }
      console.log(screenshots)
      console.log(galleryImg);
      setImages(galleryImg);
    };
    getOtherImg();
  }, []);

  const renderImages = () => {
    return images.map((imgSource) => {
      return (
        <div className="img-thumbnail-new">
          <img src={changeImageSize(imgSource.url, "t_720p")} alt="" />{" "}
        </div>
      );
    });
  };

  return (
    <>
      {screenshots.length > 0 && (
        <div className="gallery">
          {firstImage && (
            <div className="gallery--1">
              {/* {console.log(firstImage.url, "something")} */}
              <img src={changeImageSize(firstImage.url, "t_720p")} alt="" />
            </div>
          )}
          {images && (
            <div className="gallery--2">
              {renderImages()}
            </div>
          )}
        </div>
      )}
      {showModal && (
        <Modal toggleModal={toggleModal} selectedImage={selectedImage} />
      )}
    </>
  );
};

export default MansoryGallery;
