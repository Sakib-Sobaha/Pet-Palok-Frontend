import React, { useState } from "react";

import EditPassword from "../ChangePassword"

const EditPasswordModal = ({element_id, userId}) => {
  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change Password</h3>
            <EditPassword userId={userId} />
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error float-end">Close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EditPasswordModal;
