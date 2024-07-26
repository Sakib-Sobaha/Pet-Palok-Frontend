import React from "react";
import CategoryCard from "../cards/Category-card";

function Categories() {
  return (
    <div className="bg bg-base-200 m-0 p-1 pb-2 mb-4 rounded-xl">
      <h1 className="text-3xl font-bold ml-3 mb-2">Visit by Categories</h1>
      <div className="grid grid-cols-3 gap-1 align-middle">
        {/* <CategoryCard
          title="Fish"
          image="https://cdn-icons-png.flaticon.com/512/2372/2372874.png"
        />
        <CategoryCard
          title="Bird"
          image="https://static.vecteezy.com/system/resources/previews/005/536/658/original/pet-bird-icon-in-trendy-flat-style-isolated-on-soft-blue-background-free-vector.jpg"
        />
        <CategoryCard
          title="Animal"
          image="https://images.vexels.com/content/235658/preview/dog-paw-icon-emblem-04b9f2.png"
        /> */}

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

      </div>
    </div>
  );
}

export default Categories;
