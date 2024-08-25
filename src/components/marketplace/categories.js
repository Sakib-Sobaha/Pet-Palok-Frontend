import React from "react";
import CategoryCard from "../cards/Category-card";

function Categories() {
  return (
    <div className="bg bg-base-200 m-0 p-1 pb-2 mb-4 rounded-xl">
      <h1 className="text-3xl font-bold ml-3 mb-2">Visit by Categories</h1>
      <div className=" flex gap-2 align-middle">
        <CategoryCard
          title="Food"
          image="https://cdn-icons-png.flaticon.com/512/5782/5782489.png"
        />

        <CategoryCard
          title="Accessories"
          image="https://img.freepik.com/free-vector/pet-care-accessories-round-frame-illustration_1284-16003.jpg"
        />

        <CategoryCard
          title="Medicine"
          image="https://cdn-icons-png.flaticon.com/512/249/249217.png"
        />

        <CategoryCard
          
          title="Coming Soon"
          image="https://png.pngtree.com/png-clipart/20230803/original/pngtree-coming-soon-stamp-round-emblem-vintage-vector-picture-image_9445860.png"
        />
      </div>
    </div>
  );
}

export default Categories;
