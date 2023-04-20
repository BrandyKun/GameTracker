import React, { useEffect, useState } from "react";

import { changeImageSize } from "./Service";
import Modal from "./Modal";

const MansoryGallery = ({ screenshots }) => {
  const [firstImage, setFirstImage] = useState();
  const [images, setImages] = useState();
  const [selectedImage, setImageClicked] = useState();
  const [showModal, setModal] = useState(false);

  const toggleModal = (image, index) => {
    setImageClicked(image);
    setModal(!showModal);
  };

  useEffect(() => {
    const getImg = () => {
      if (screenshots != null && screenshots != undefined) {
        const arrayOfImg = screenshots;
        const image = arrayOfImg[arrayOfImg.length - arrayOfImg.length];
        setFirstImage(image);
      }
    };
    getImg();
  }, []);

  useEffect(() => {
    const getOtherImg = () => {
      let galleryImg = [];
      let gallerySize = 5;
      if (screenshots.length < 4) {
        gallerySize = screenshots.length;
      }

      for (let i = 1; i < gallerySize; i++) {
        galleryImg.push(screenshots[i]);
      }
      setImages(galleryImg);
    };
    getOtherImg();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const renderImages = () => {
    return images.map((imgSource, index) => {
      return (
        <div
          key={imgSource.id}
          className="img-thumbnail-new"
          onClick={() => toggleModal(imgSource, index)}
        >
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
            <div className="gallery--1" onClick={() => toggleModal(firstImage)}>
              <img src={changeImageSize(firstImage.url, "t_720p")} alt="" />
            </div>
          )}
          {images && <div className="gallery--2">{renderImages()}</div>}
          {showModal && (
            <Modal toggleModal={toggleModal} selectedImage={selectedImage} />
          )}
        </div>
      )}
    </>
  );
};

export default MansoryGallery;
