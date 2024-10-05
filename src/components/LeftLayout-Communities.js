import React from "react";
import CreateCommunity from "./modals/create-community";
const LeftLayout = ({ type }) => {
  return (
    <div className="flex-1 bg-base-200 p-4 min-h-screen h-full rounded-lg">
      {/* Your content for LeftLayout */}
      <CreateCommunity element_id={"create_community"} />
      {/* Community Filters */}
      <button
        className="btn btn-primary rounded-lg w-full"
        onClick={() => {
          console.log("Create Community Button Clicked");
          document.getElementById("create_community").showModal();
        }}
      >
        + Create Community
      </button>
    </div>
  );
};

export default LeftLayout;
