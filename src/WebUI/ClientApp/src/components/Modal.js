import React, { useContext, useEffect, useState, useCallback } from "react";
import { changeImageSize } from "./Service";
import { GameContext } from "../context/GameContext";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Modal = () => {
  const [modalImage, setModalImage] = useState();
  const {
    screenshots,
    selectedImage,
    setImageClicked,
    setImageIndex,
    toggleModal,
    imageIndex
  } = useContext(GameContext);

  useEffect(() => {
    setModalImage(selectedImage);
  }, [selectedImage]);

  const getNextImage = useCallback(() => {
    if (screenshots && screenshots.length > 0) {
      const nextIndex = (imageIndex + 1) % screenshots.length;
      setImageClicked(screenshots[nextIndex]);
      setImageIndex(nextIndex);
    }
  }, [imageIndex, screenshots, setImageClicked, setImageIndex]);

  const getPreviousImage = useCallback(() => {
    if (screenshots && screenshots.length > 0) {
      const previousIndex = (imageIndex - 1 + screenshots.length) % screenshots.length;
      setImageClicked(screenshots[previousIndex]);
      setImageIndex(previousIndex);
    }
  }, [imageIndex, screenshots, setImageClicked, setImageIndex]);

  if (!screenshots || screenshots.length === 0) {
    return null; // Don't render the modal if there are no screenshots
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <BiChevronLeft onClick={getPreviousImage} className="chevron chevron-left" />
        <img src={changeImageSize(modalImage?.url, "t_1080p")} alt="Modal content" />
        <BiChevronRight onClick={getNextImage} className="chevron chevron-right" />
        <button onClick={toggleModal}>X</button>
      </div>
    </div>
  );
};

export default Modal;
