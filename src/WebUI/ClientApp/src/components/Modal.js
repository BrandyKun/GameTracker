import React from "react";

const Modal = ({ toggleModal, selectedImage }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src="https://sm.ign.com/t/ign_ap/screenshot/default/xxqf393xrx081fsdf_6hrb.1200.jpg" />
        <button onClick={toggleModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
