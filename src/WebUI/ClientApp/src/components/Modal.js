import React from "react";
import { changeImageSize } from "./Service";

const Modal = ({ toggleModal, selectedImage }) => {
  console.log(selectedImage);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={changeImageSize(selectedImage?.url, 't_screenshot_huge')} />
        <button onClick={toggleModal}>X</button>
      </div>
    </div>
  );
};

export default Modal;
