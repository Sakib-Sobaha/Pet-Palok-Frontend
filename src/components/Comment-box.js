import React from "react";
import SingleComment from "./comments/SingleComment"


const CommentBox = () => {
  return (
    <div>
      <div className="collapse bg-primary collapse-arrow rounded-t-none">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">View Comments</div>
        <div className="collapse-content">
          {/* <p>hello</p> */}
          <SingleComment/>
          <SingleComment />
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
