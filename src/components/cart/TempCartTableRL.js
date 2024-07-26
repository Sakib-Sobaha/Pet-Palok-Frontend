import React, { useState } from "react";

const initialCartItems = [
  {
    name: "Odomos Doggy",
    price_per_unit: 90,
    quantity: "250g",
    count: 1,
    total_available_count: 4,
    pet_type: "Animal",
    type: "medicine",
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  },
  {
    name: "Cat Food",
    price_per_unit: 59,
    quantity: "100g",
    count: 3,
    total_available_count: 4,
    pet_type: "Animal",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Seed Mix",
    price_per_unit: 290,
    quantity: "500g",
    count: 4,
    total_available_count: 4,
    pet_type: "Bird",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://t3.ftcdn.net/jpg/00/95/29/28/360_F_95292880_GfqmxNb4u8ZxG18i2jkLt6gkAvl8xdz3.jpg",
  },
  {
    name: "Cattlefish Bone",
    price_per_unit: 125,
    quantity: "200g",
    count: 0,
    total_available_count: 4,
    pet_type: "Bird",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRHc-hn-wtBtKuCnyl_aQo3bp6Sqx8G2oIadx2-T3svIVieizMMDT-me2CBv8oksfsn",
  },
];

function TempCartTableRL() {
  const [cartItems, setCartItems] = useState(initialCartItems);

//   const deliveryFee = district === "Dhaka" ? 65 : 120;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price_per_unit * item.count,
    0
  );

  return (
    <div className=" grid place-content-center">
      <table className="table table-header-group">
        {/* head */}
        <thead>
          <tr>
            <th>Product</th>
            {/* <th>Quantity</th> */}
            <th>Unit Count</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  {/* <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div> */}
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm opacity-50">{item.pet_type}</div>
                  </div>
                </div>
              </td>
              {/* <td>{item.quantity}</td> */}
              <td className="justify-center">
                <div className="flex items-center">
                  <span className="mx-6">{item.count}</span>
                </div>
              </td>
              <td>{item.price_per_unit * item.count} Taka</td>
            </tr>
          ))}

          <tr>
            <td className="font-bold"> Total</td>
            <td></td>
            {/* <td></td> */}
            <td className="font-bold">{totalPrice} Taka</td>
          </tr>


          
        </tbody>
      </table>
      
    </div>
  );
}

export default TempCartTableRL;
