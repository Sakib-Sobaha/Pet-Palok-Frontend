import React, { useState } from "react";

const sellers = [
  {
    id: 1,
    firstname: "Abir",
    lastname: "Auntor",

    email: "niloy870@gmail.com",
    phone: "01234123456",

    password: "pasword",

    store_name: "Abir Bird Care",
    store_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",

    address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
    postOffice: "Mirpur-2",
    district: "Dhaka",
    country: "Bangladesh",

    DOB: "2020-01-01",
    gender: "male",

    about:
      "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",

    rating_vetvisit: "4",
  },
  {
    id: 2,
    firstname: "Niloy",
    lastname: "Faiaz",

    email: "niloy870@gmail.com",
    phone: "01234123456",

    password: "pasword",

    store_name: "Koki and Birdy",
    store_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",

    address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
    postOffice: "Mirpur-2",
    district: "Dhaka",
    country: "Bangladesh",

    DOB: "2020-01-01",
    gender: "male",

    about:
      "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",

    rating_vetvisit: "4",
  },
  {
    id: 3,
    firstname: "Sakib",
    lastname: "Sobaha",

    email: "niloy870@gmail.com",
    phone: "01234123456",

    password: "pasword",

    store_name: "Sakibs Pet Shop",
    store_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",

    address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
    postOffice: "Mirpur-2",
    district: "Dhaka",
    country: "Bangladesh",

    DOB: "2020-01-01",
    gender: "male",

    about:
      "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",

    rating_vetvisit: "4",
  },
];

const initialCartItems = [
  {
    name: "Odomos Doggy",
    sellerId: 1,
    price_per_unit: 90,
    quantity: "250g",
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "medicine",
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  },
  {
    name: "Cat Food",
    sellerId: 1,
    price_per_unit: 59,
    quantity: "100g",
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Seed Mix",
    sellerId: 2,
    price_per_unit: 290,
    quantity: "500g",
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://t3.ftcdn.net/jpg/00/95/29/28/360_F_95292880_GfqmxNb4u8ZxG18i2jkLt6gkAvl8xdz3.jpg",
  },
  {
    name: "Cattlefish Bone",
    sellerId: 3,
    price_per_unit: 125,
    quantity: "200g",
    count: 0,
    total_available_count: 4,
    pet_type: "Animal",
    type: "food",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRHc-hn-wtBtKuCnyl_aQo3bp6Sqx8G2oIadx2-T3svIVieizMMDT-me2CBv8oksfsn",
  },
];

function CartTable() {
  const [alertText, setAlertText] = useState("");
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const getStoreName = (sellerId) => {
    const seller = sellers.find((s) => s.id === sellerId);
    return seller ? seller.store_name : "Unknown Store";
  };

  const groupItemsByStore = (items) => {
    return items.reduce((acc, item, index) => {
      const storeName = getStoreName(item.sellerId);
      if (!acc[storeName]) {
        acc[storeName] = [];
      }
      acc[storeName].push({ ...item, index });
      return acc;
    }, {});
  };

  const groupedItems = groupItemsByStore(cartItems);

  // Handle checkbox change to select or deselect an item
  const handleCheckboxChange = (storeName, itemIndex) => {
    setSelectedItems((prevSelected) => {
      const key = `${storeName}-${itemIndex}`;
      const updatedSelection = { ...prevSelected };
      if (updatedSelection[key]) {
        delete updatedSelection[key]; // Deselect item
      } else {
        updatedSelection[key] = true; // Select item
      }
      return updatedSelection;
    });
  };

  // Checkout action
  const handleCheckout = () => {
    const selectedItemNames = Object.keys(selectedItems)
      .filter((key) => selectedItems[key])
      .map((key) => {
        const [storeName, index] = key.split("-");
        return groupedItems[storeName][parseInt(index, 10)].name;
      });

    if (selectedItemNames.length > 0) {
      setAlertText(`Checkout these items: ${selectedItemNames.join(", ")}`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      // Change the URL to the checkout page
      // add 1 second delay to show the alert message
        


      window.location.href = "/checkout";
    } else {
      setAlertText("No items selected for checkout");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  // Clear Cart action
  const handleClearCart = () => {
    setCartItems([]); // Clear all items from the cart
    setSelectedItems({}); // Clear selected items
  };

  // Remove Selected action
  const handleRemoveSelected = () => {
    const itemsToRemove = Object.keys(selectedItems).filter(
      (key) => selectedItems[key]
    );
    const newCartItems = cartItems.filter((_, index) => {
      const storeName = getStoreName(cartItems[index].sellerId);
      return !itemsToRemove.includes(`${storeName}-${index}`);
    });
    setCartItems(newCartItems);
    setSelectedItems({}); // Clear selected items after removal
  };

  // Handle increment
  const handleIncrement = (storeName, itemIndex) => {
    setCartItems((prevItems) =>
      prevItems.map((item, index) =>
        index === itemIndex && item.count < item.total_available_count
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  // Handle decrement
  const handleDecrement = (storeName, itemIndex) => {
    setCartItems((prevItems) =>
      prevItems.map((item, index) =>
        index === itemIndex && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      {Object.keys(groupedItems).map((storeName) => (
        <div key={storeName} className="mb-4">
          <h2 className="text-xl font-bold mb-2">{storeName}</h2>
          <table className="table w-full mb-4">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" disabled />
                  </label>
                </th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price Per Unit</th>
                <th>Unit Count</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {groupedItems[storeName].map((item, index) => (
                <tr key={item.name + index}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={!!selectedItems[`${storeName}-${index}`]}
                        onChange={() => handleCheckboxChange(storeName, index)}
                      />
                    </label>
                  </th>
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
                  <td className="justify-center">
                    <button
                      className="btn btn-xs btn-outline m-1"
                      onClick={() => handleDecrement(storeName, item.index)}
                      disabled={item.count <= 0}
                    >
                      -
                    </button>
                    {item.count}
                    <button
                      className="btn btn-xs btn-outline m-1"
                      onClick={() => handleIncrement(storeName, item.index)}
                      disabled={item.count >= item.total_available_count}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.price_per_unit * item.count} Taka</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <button
        className="btn btn-primary float-right m-1"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      <button
        className="btn btn-error float-right m-1"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      <button
        className="btn btn-warning float-right m-1"
        onClick={handleRemoveSelected}
      >
        Remove Selected
      </button>

      {showAlert && (
        <div
          role="alert"
          className="alert alert-success flex items-center mt-4 p-4 bg-orange-300 border border-orange-400 text-orange-700 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current mr-2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{alertText}</span>
        </div>
      )}
    </div>
  );
}

export default CartTable;