import React, { useState } from "react";

const CommunityCard = ({ title, image, description, params }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div className="card card-compact w-64 bg-base-100 shadow-xl border h-auto mb-2 ms-2">
        <figure className="w-full max-w-full h-auto min-h-36">
          {/* <img src={image} alt="image" className="" /> */}
          <img
            src={
              params &&
              params.image &&
              Array.isArray(params.image) &&
              params.image.length > 0
                ? params.image[0]
                : image
            }
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>
            {showMore ? description : description && description.slice(0, 100)}
          </p>
          {description && description.length > 100 && (
            <button
              onClick={toggleShowMore}
              className="text-blue-500 hover:underline"
            >
              {showMore ? "See Less" : "See More"}
            </button>
          )}
          {/* <p>{description}</p> */}
          <div className="card-actions justify-center">
            <button className="btn btn-primary italic">
              Visit this Community
            </button>
          </div>

          <div className="card-actions justify-center">
            <button className="btn btn-accent italic">
              Join this Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
