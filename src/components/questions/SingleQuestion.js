import React from "react";

const review = {
  id: 122,
  reviewer: "Niloy Faiaz",
  rating: 1,
  time: "22-01-2024",
  review_text: "Baje product, keu kinben na",
  anonymous: true,
};

function SingleQuestion({ anonymous = true }) {
  return (
    <div className="border border-content bg-base-200 rounded-lg mb-2 p-0 items-center">
      <div className="border border-content bg-secondary rounded-lg p-1 items-center flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          // fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-4 mb-1 mt-1 ml-1"
        >
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v11l-4 4z"></path>
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v11l-4 4z"></path>
          <line x1="15" y1="10" x2="21" y2="10"></line>
          <line x1="15" y1="14" x2="21" y2="14"></line>
          <line x1="15" y1="18" x2="21" y2="18"></line>
        </svg>

        <div className="w-full">
          <div className="">
            {anonymous ? (
              <h1 className="font-bold text-content">Anonymous Reviewer</h1>
            ) : (
              <h1 className="font-bold text-content">{review.reviewer}</h1>
            )}
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
      <div className="flex">
        <div className="w-1/12"></div>
        <div className="flex border border-content bg-secondary rounded-lg p-1 w-11/12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            // fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-4 mb-1 mt-1 ml-1"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v11l-4 4z"></path>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v11l-4 4z"></path>
            <line x1="15" y1="10" x2="21" y2="10"></line>
            <line x1="15" y1="14" x2="21" y2="14"></line>
            <line x1="15" y1="18" x2="21" y2="18"></line>
          </svg>
          <div>
            <h1 className="font-bold text-content">Bird Pet Care</h1>
            <h1 className="font-semibold text-sm">Yes Sir</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleQuestion;
