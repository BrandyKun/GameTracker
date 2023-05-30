import React, { useContext } from "react";
import { changeImageSize } from "./Service";
import { GameContext } from "../context/GameContext";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi"

const Modal = ({ toggleModal,imageIndex, selectedImage }) => {
  const {screenshots, setImageIndex} = useContext(GameContext);
  console.log(imageIndex);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <BiChevronLeft />
        <img src={changeImageSize(selectedImage?.url, 't_1080p')} />
        <BiChevronRight/>
        <button onClick={toggleModal}>X</button>
      </div>
    </div>
  );
};

export default Modal;
