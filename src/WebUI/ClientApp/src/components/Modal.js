import React, { useContext, useEffect, useState } from "react";
import { changeImageSize } from "./Service";
import { GameContext } from "../context/GameContext";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Modal = () => {
  const [modalImage, setModalImage] = useState();
  const { screenshots, selectedImage, setImageClicked, setImageIndex, toggleModal, imageIndex } =
    useContext(GameContext);
  console.log(imageIndex);

  useEffect(() => {
    setModalImage(selectedImage);
  }, [selectedImage]);

  const getNextImage = () => {
    let imagetoreturnIndex = 0;
    let nextIndex = imageIndex + 2;
    if (nextIndex > screenshots.length - 1 || imageIndex ===undefined) {
      imagetoreturnIndex = 0;
    } else {
      imagetoreturnIndex = imageIndex +1;
    }

    console.log(screenshots[imagetoreturnIndex], "image");
    setImageClicked(screenshots[imagetoreturnIndex]);
    setImageIndex(imagetoreturnIndex);
  };
  const getPreviousImage = () => {
    let imagetoreturnIndex = 0;
    let nextIndex = imageIndex - 2;
    if (nextIndex < 0 || imageIndex === undefined) {
      imagetoreturnIndex = screenshots.length - 1 ;
    } else {
      imagetoreturnIndex = imageIndex -1;
    }

    console.log(screenshots[imagetoreturnIndex], "image");
    setImageClicked(screenshots[imagetoreturnIndex]);
    setImageIndex(imagetoreturnIndex);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <BiChevronLeft onClick={getPreviousImage} className="chevron chevron-left" />
        <img src={changeImageSize(modalImage?.url, "t_1080p")} />
        <BiChevronRight
          onClick={getNextImage}
          className="chevron chevron-right"
        />
        <button onClick={toggleModal}>X</button>
      </div>
    </div>
  );
};

export default Modal;
