import React from "react";
import ItemCard from "../cards/Item-Card";

const itemData = [
    {
        name: "Odomos Doggy",
        price_per_unit: 90,
        quantity: "250g",
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"medicine",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg"
    },
    {
        name: "Cat Food",
        price_per_unit: 59,
        quantity: "100g",
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Seed Mix",
        price_per_unit: 290,
        quantity: "500g",
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://t3.ftcdn.net/jpg/00/95/29/28/360_F_95292880_GfqmxNb4u8ZxG18i2jkLt6gkAvl8xdz3.jpg"
    },
    {
        name: "Cattlefish Bone",
        price_per_unit: 125,
        quantity: "200g",
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"food",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRHc-hn-wtBtKuCnyl_aQo3bp6Sqx8G2oIadx2-T3svIVieizMMDT-me2CBv8oksfsn"
    },
    {
        name: "Dog Water Pot",
        price_per_unit: 90,
        quantity: "3 pieces",
        count: 0,
        total_available_count: 4,
        pet_type: "Animal",
        type:"accessories",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://www.treehugger.com/thmb/Ocxi8FYaubDwjOwria6FNpGjJjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-953005498-4ca60c6c2c5f4b0e881b2746ad5f17ef.jpg"
    }
];

function MarketItemContainer({text}) {
    return (
        <div className="bg bg-base-200 m-0 mb-4 rounded-xl">
        <h1 className="text-3xl font-bold ml-3">{text}</h1>
        <div className="grid grid-cols-3 gap-2 align-middle mr-1">
            {itemData.map((item, index) => (
                <ItemCard key={index} item={item} />
            ))}
        </div>
        </div>
    );
}

export default MarketItemContainer;
