import React from "react";
import ItemCard from "../cards/Item-card-landing";

const itemData = [
    {
        name: "Odomos Doggy",
        price_per_unit: 90,
        quantity: "250g",
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"medicine",
        rating:4,
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://m.media-amazon.com/images/I/41-eQbUPu9L._AC_.jpg"
    },
    {
        name: "Cat Food",
        price_per_unit: 59,
        quantity: "100g",
        rating:4,
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://ithinkpets.com/wp-content/uploads/2023/05/Catfest-Pillows-with-Chicken-Cream-Cat-Treat-at-ithinkpets.com-1-1200x973.webp"
    },
    {
        name: "Seed Mix",
        price_per_unit: 290,
        quantity: "500g",
        rating:4.6,
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://images.meesho.com/images/products/227181817/j4vdh_512.webp"
    },
    {
        name: "Cattlefish Bone",
        price_per_unit: 125,
        quantity: "200g",
        rating:2.4,
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://5.imimg.com/data5/ZA/KT/GO/SELLER-136396/cuttlefish-bone-500x500.JPG"
    },
    {
        name: "Dog Water Pot",
        price_per_unit: 90,
        quantity: "3 pieces",
        rating:5,
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"accessories",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://m.media-amazon.com/images/I/414gIdoFwNL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        name: "Odomos Doggy",
        price_per_unit: 90,
        quantity: "250g",
        rating:1.2,
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"medicine",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://m.media-amazon.com/images/I/41-eQbUPu9L._AC_.jpg"
    },
    {
        name: "Cat Food",
        price_per_unit: 59,
        rating:3.4,
        quantity: "100g",
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://ithinkpets.com/wp-content/uploads/2023/05/Catfest-Pillows-with-Chicken-Cream-Cat-Treat-at-ithinkpets.com-1-1200x973.webp"
    },
    {
        name: "Seed Mix",
        price_per_unit: 290,
        quantity: "500g",
        rating:4.7,
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://images.meesho.com/images/products/227181817/j4vdh_512.webp"
    },
    {
        name: "Cattlefish Bone",
        price_per_unit: 125,
        quantity: "200g",
        rating:3.8,
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://5.imimg.com/data5/ZA/KT/GO/SELLER-136396/cuttlefish-bone-500x500.JPG"
    },
    {
        name: "Dog Water Pot",
        price_per_unit: 90,
        quantity: "3 pieces",
        rating:1.3,
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"accessories",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://m.media-amazon.com/images/I/414gIdoFwNL._AC_UF1000,1000_QL80_.jpg"
    }
];

function PetCardCarousel() {
  return (
    <div className="bg-base-300 m-2 p-0 rounded-lg pt-2">
      <h1 className="text-3xl font-bold ml-3 mt-0">Visit Our Marketplace</h1>
      <div className="overflow-x-auto w-full"> 
        <div className="carousel rounded-box m-2 p-2 mt-0 overflow-x-auto">
          {/* {petData.map((pet, index) => (
            <PetCard key={index} pet={pet} className="carousel-item w-full" />
          ))} */}
          {itemData.map((item, index) => (
                <ItemCard key={index} item={item} className="carousel-item w-full"/>
            ))}
        </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-2 align-middle mr-1">
        {petData.map((pet, index) => (
          <PetCard key={index} pet={pet} />
        ))}
      </div> */}
    </div>
  );
}

export default PetCardCarousel;
