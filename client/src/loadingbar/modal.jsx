import React from "react";
import "./modal.css";

const Modal = ({ isOpen, message, onClose }) => {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{message.title}</h3>
        </div>
        <div className="modal-body">
          <p>{message.body}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
