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
    if (nextIndex > screenshots.legth - 1 || imageIndex == undefined) {
      imagetoreturnIndex = 0;
    } else {
      imagetoreturnIndex = imageIndex +1;
    }

    // console.log(imagetoreturnIndex+1, "index");
    console.log(screenshots[imagetoreturnIndex], "image");
    setImageClicked(screenshots[imagetoreturnIndex+1]);
    setImageIndex(imagetoreturnIndex+1);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <BiChevronLeft className="chevron chevron-left" />
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
