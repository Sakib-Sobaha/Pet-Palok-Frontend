import React from "react";

const ViewImageModal = ({ image, element_id }) => {
  return (
    <>
      <dialog id={element_id} className="modal ">
        <div className="modal-box w-full h-full p-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={image}
              alt="Image"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="modal-action absolute bottom-0 right-0 p-4">
            <form method="dialog">
              <button className="btn btn-error">x</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ViewImageModal;
