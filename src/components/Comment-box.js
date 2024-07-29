import React from "react";
import SingleComment from "./comments/SingleComment";

const CommentBox = () => {
  return (
    <div>
      <div className="collapse bg-primary collapse-arrow rounded-t-none">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">View Comments</div>
        <div className="collapse-content">
          <div className="bg-base-200 mb-2 p-1 rounded-md">
            <input
              type="text"
              placeholder="Write your comment here..."
              className="input input-bordered rounded-md pr-1 input-primary w-3/4"
            />
            <button className="btn btn-primary rounded-md text-center w-1/4">Comment</button>
          </div>
          {/* <p>hello</p> */}
          <SingleComment />
          <SingleComment />
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
