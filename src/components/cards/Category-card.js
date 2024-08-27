import React from "react";

function CategoryCard({ title, image }) {
  // Determine opacity based on title
  const isComingSoon = title === "Coming Soon";
  const imageOpacity = isComingSoon ? "opacity-50" : "opacity-100";
  const buttonOpacity = isComingSoon ? "opacity-50" : "opacity-100";

  return (
    <div className={`card glass w-32 bg-cover bg-center h-full ${isComingSoon ? "bg-gray-200" : ""}`}>
      <figure className="relative">
        <img
          className={`w-32 h-32 ${imageOpacity} transition-opacity duration-300`}
          src={image}
          alt="Category"
        />
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            {/* Coming Soon */}
          </div>
        )}
      </figure>
      <button
        className={`btn btn-primary rounded-box ${buttonOpacity} transition-opacity duration-300`}
        // disabled={isComingSoon} // Disable the button if "Coming Soon"
        
      >
        {title}
      </button>
    </div>
  );
}

export default CategoryCard;
