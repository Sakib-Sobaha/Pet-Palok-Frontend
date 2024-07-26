import React, { useState } from "react";

const initialCartItems = [
  {
    name: "Odomos Doggy",
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Handle checkbox change to select or deselect an item
  const handleCheckboxChange = (index) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index); // Deselect item
      } else {
        return [...prevSelected, index]; // Select item
      }
    });
  };

  // Checkout action
  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      const itemsToCheckout = cartItems.filter((_, index) =>
        selectedItems.includes(index)
      );
      setAlertText(
        `Checkout these items: ${itemsToCheckout
          .map((item) => item.name)
          .join(", ")}`
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      // change the url to the checkout page
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
    setSelectedItems([]); // Clear selected items
  };

  // Remove Selected action
  const handleRemoveSelected = () => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => !selectedItems.includes(index))
    );
    setSelectedItems([]); // Clear selected items after removal
  };

  // Handle increment
  const handleIncrement = (index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.count < item.total_available_count
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  // Handle decrement
  const handleDecrement = (index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
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
          {cartItems.map((item, index) => (
            <tr key={index}>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
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
                    <div className="text-sm opacity-50">{item.pet_type}</div>
                  </div>
                </div>
              </td>
              <td>{item.quantity}</td>
              <td>{item.price_per_unit} Taka</td>
              <td className="justify-center">
                <button
                  className="btn btn-xs btn-outline m-1"
                  onClick={() => handleDecrement(index)}
                  disabled={item.count <= 0}
                >
                  -
                </button>
                {item.count} 
                <button
                  className="btn btn-xs btn-outline m-1"
                  onClick={() => handleIncrement(index)}
                  disabled={item.count >= item.total_available_count}
                >
                  +
                </button>
              </td>{" "}
              <td>{item.price_per_unit * item.count} Taka</td>
            </tr>
          ))}
          {/* <tr></tr> */}
        </tbody>
      </table>

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
