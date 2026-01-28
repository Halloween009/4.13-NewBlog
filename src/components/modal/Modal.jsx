import React from "react";

function Modal({ closeModal, deleteArticle }) {
  return (
    <div className="modal-bg">
      <div className="modal-container">
        <div className="modal-title">
          <h4>Are you sure you want to delete this article?</h4>
        </div>
        <div className="modal-btns">
          <button
            className="modal-yes-btn"
            onClick={async () => {
              await deleteArticle();
              closeModal(false);
            }}
          >
            Yes
          </button>
          <button
            className="modal-no-btn"
            onClick={() => {
              closeModal(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
