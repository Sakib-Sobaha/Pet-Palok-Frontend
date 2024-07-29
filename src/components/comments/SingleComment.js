import React from "react";
import Reply from "./Reply";

const review = {
  id: 122,
  reviewer: "Niloy Faiaz",
  rating: 1,
  time: "22-01-2024",
  review_text: "Baje product, keu kinben na",
};

function SingleComment({ anonymous = false }) {
  return (
    <div className="border border-black bg-base-200 rounded-lg mb-2 p-1 items-center">
      <div className="border border-black bg-base-300 rounded-lg p-1 items-center mb-1 flex">
        <img
          src="https://cdn3.iconfinder.com/data/icons/aami-web-internet/64/aami5-59-512.png"
          alt="user"
          className="w-8 h-8 m-2 border border-base-content  "
        />
        <div className="w-full">
          <div className="">
            <h1 className="font-bold text-content">{review.reviewer}</h1>
          </div>
          {/* Render username directly */}
          <h1 className="font-semibold">{review.review_text}</h1>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="clock"
              width="20"
              height="20"
              stroke="white"
              className="mr-1 justify-center"
            >
              <path d="M12,6a.99974.99974,0,0,0-1,1v4.38379L8.56934,12.60693a.99968.99968,0,1,0,.89843,1.78614l2.98145-1.5A.99874.99874,0,0,0,13,12V7A.99974.99974,0,0,0,12,6Zm0-4A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"></path>
            </svg>
            <p>{review.time}</p>
          </div>
        </div>
      </div>

      <Reply />
      <Reply />
      <div>
        <div className="mb-1">
          <div className="flex">
            <div className="w-1/12">
              <div className="avatar ">
                <div className="w-full max-h-16 mt-1 mr-1 rounded-full"></div>
              </div>
            </div>
            <div className="bg-base-200 mb-2 p-1 rounded-md w-11/12">
              <input
                type="text"
                placeholder="Reply to comment here..."
                className="input input-bordered rounded-md pr-1 input-primary w-4/5"
              />
              <button className="btn btn-primary rounded-md text-center w-1/5">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
