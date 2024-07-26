import React from "react";

function CategoryCard({ title, image }) {
  return (
    <div
      className="card glass w-64 bg-cover bg-center h-full"
      
    >
      <figure>
        <img className="w-64 h-64" src={image} alt="car!" />
      </figure>
      <button className="btn btn-primary rounded-box">{title}</button>

    </div>
  );
}

export default CategoryCard;
