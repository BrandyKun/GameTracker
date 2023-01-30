import React, { useEffect, useState } from "react";

import { changeImageSize } from "./Service";
import Modal from "./Modal";

const MansoryGallery = ({ screenshots }) => {
  let [count, setCount] = useState(0);
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
        const arrayOfImg = screenshots;
        const image = arrayOfImg[arrayOfImg.length - (arrayOfImg.length - 1)];
        debugger;
        const otherImages = arrayOfImg.splice(0, 1);

        setFirstImage(image);

        setImages(otherImages);
        console.log(otherImages, "array");
        console.log(image, "first image");
    };
    getImg();
  }, []);

  return (
    <>
      {firstImage ? (
        <div className="gallery">
          <div className="gallery--1">
            <img src={changeImageSize(firstImage.url, "t_720p")} alt="" />
          </div>
          <div className="gallery--2">
            <div className="img-thumbnail"></div>
            <div className="img-thumbnail"></div>
            <div className="img-thumbnail"></div>
            <div className="img-thumbnail"></div>
          </div>
         
        </div>
      ) : (
        <></>
      )}
      {showModal && (
            <Modal toggleModal={toggleModal} selectedImage={selectedImage} />
          )}
    </>
  );
};

export default MansoryGallery;
