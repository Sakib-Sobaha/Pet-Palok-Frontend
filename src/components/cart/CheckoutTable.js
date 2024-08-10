import React, { useState, useEffect } from "react";

const sellers = [
  {
    id: 1,
    firstname: "Abir",
    lastname: "Auntor",
    store_name: "Abir Bird Care",
    store_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",
    district: "Dhaka",
  },
  {
    id: 2,
    firstname: "Niloy",
    lastname: "Faiaz",
    store_name: "Koki and Birdy",
    store_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",
    district: "Dhaka",
  },
  {
    id: 3,
    firstname: "Sakib",
    lastname: "Sobaha",
    store_name: "Sakibs Pet Shop",
    store_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",
    district: "Dhaka",
  },
];

const initialCartItems = [
  {
    itemId: 1,
    name: "Odomos Doggy",
    sellerId: 1,
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
    itemId: 2,
    name: "Cat Food",
    sellerId: 1,
    price_per_unit: 59,
    quantity: "100g",
    count: 3,
    total_available_count: 4,
    pet_type: "Animal",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixitemId=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    itemId: 34,
    name: "Seed Mix",
    sellerId: 2,
    price_per_unit: 290,
    quantity: "500g",
    count: 4,
    total_available_count: 4,
    pet_type: "Animal",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://t3.ftcdn.net/jpg/00/95/29/28/360_F_95292880_GfqmxNb4u8ZxG18i2jkLt6gkAvl8xdz3.jpg",
  },
  {
    itemId: 5,
    name: "Cattlefish Bone",
    sellerId: 3,
    price_per_unit: 125,
    quantity: "200g",
    count: 1,
    total_available_count: 4,
    pet_type: "Animal",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRHc-hn-wtBtKuCnyl_aQo3bp6Sqx8G2oIadx2-T3svIVieizMMDT-me2CBv8oksfsn",
  },
];

function CheckoutTable({ district, onOrdersCreated }) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const deliveryFee = district === "Dhaka" ? 65 : 120;

  const getStoreDetails = (sellerId) => {
    const seller = sellers.find((s) => s.id === sellerId);
    return seller ? seller : { store_name: "Unknown Store" };
  };

  const groupItemsByStore = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.sellerId]) {
        acc[item.sellerId] = {
          sellerId: item.sellerId,
          items: [],
          storeTotalPrice: 0,
          deliveryFee: deliveryFee,
          storeTotalPayment: 0,
        };
      }
      acc[item.sellerId].items.push({
        itemId: item.itemId,
        count: item.count,
      });
      acc[item.sellerId].storeTotalPrice += item.price_per_unit * item.count;
      return acc;
    }, {});
  };

  const groupedItems = groupItemsByStore(cartItems);

  const storeTotals = Object.values(groupedItems).map((store) => {
    const storeTotalPayment = store.storeTotalPrice + store.deliveryFee;
    return {
      sellerId: store.sellerId,
      items: store.items,
      totalPrice: store.storeTotalPrice,
      deliveryFee: store.deliveryFee,
      storeTotalPayment: storeTotalPayment,
    };
  });

  useEffect(() => {
    onOrdersCreated(storeTotals);
  }, [storeTotals, onOrdersCreated]);

  return (
    <div className="overflow-x-auto grid place-content-center">
      {storeTotals.map((store) => {
        const storeName = getStoreDetails(store.sellerId).store_name;
        return (
          <div key={store.sellerId} className="mb-4">
            <h2 className="text-xl font-bold mb-2">{storeName}</h2>
            <table className="table w-full mb-4">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Unit Count</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems
                  .filter((item) => item.sellerId === store.sellerId)
                  .map((item, index) => (
                    <tr key={item.itemId + index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={item.image} alt={item.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price_per_unit} Taka</td>
                      <td className="justify-center">{item.count}</td>
                      <td>{item.price_per_unit * item.count} Taka</td>
                    </tr>
                  ))}
                <tr>
                  <td className="font-bold">Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-bold">
                    {store.totalPrice} Taka
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Delivery Fee</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-bold">
                    {store.deliveryFee} Taka
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Store Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-bold">
                    {store.storeTotalPayment} Taka
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default CheckoutTable;
