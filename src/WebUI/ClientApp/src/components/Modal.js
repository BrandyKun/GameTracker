import React from "react";

const Modal = ({toggleModal, selectedImage}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={selectedImage.url} />
        <button onClick={toggleModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
