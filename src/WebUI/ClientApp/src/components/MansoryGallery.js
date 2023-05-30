import React, { useContext, useEffect, useState } from "react";

import { changeImageSize } from "./Service";
import Modal from "./Modal";
import { GameContext } from "../context/GameContext";

const MansoryGallery = ({ screenshots }) => {
  const [firstImage, setFirstImage] = useState();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState();
  const [selectedImage, setImageClicked] = useState();
  const [showModal, setModal] = useState(false);
  const {imageIndex, setImageIndex} = useContext(GameContext)

  const toggleModal = (image, index) => {
    setImageClicked(image);
    setModal(!showModal);
    setImageIndex(index);
  };

  useEffect(() => {
    const getImg = () => {
      if (screenshots != null && screenshots != undefined) {
        setLoading(true)
        const arrayOfImg = screenshots;
        const image = arrayOfImg[arrayOfImg.length - arrayOfImg.length];
        console.log(arrayOfImg)
        setFirstImage(image);
      }
    };
    getImg();
  }, []);

  useEffect(() => {
    const getOtherImg = () => {
      if (screenshots) {
        let galleryImg = [];
        let gallerySize = 5;
        if (screenshots.length < 5) {
          gallerySize = screenshots.length;
        }

        for (let i = 1; i < gallerySize; i++) {
          galleryImg.push(screenshots[i]);
        }
        setImages(galleryImg);
      }
      setLoading(false);
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
            <Modal toggleModal={toggleModal} imageIndex= {imageIndex} selectedImage={selectedImage} />
          )}
        </div>
      )}
    </>
  );
};

export default MansoryGallery;
