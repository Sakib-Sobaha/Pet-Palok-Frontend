import React, { useState } from "react";
import CartTable from "./cart/CartTable";
import CheckoutTable from "./cart/CheckoutTable";

const MiddleLayoutCart = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [groupedByStore, setGroupedByStore] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("Niloy Faiaz");
  const [email, setEmail] = useState("niloy870@gmail.com");
  const [phone, setPhone] = useState("01234123456");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [address, setAddress] = useState("10/1, Monipur, Mirpur-2, Dhaka-1216");
  const [postOffice, setPostOffice] = useState("Mirpur-2");
  const [district, setDistrict] = useState("Dhaka");
  const [country, setCountry] = useState("Bangladesh");

  const handleOrdersCreated = (storeOrders) => {
    const updatedOrders = storeOrders.map((storeOrder) => ({
      sellerId: storeOrder.sellerId,
      items: storeOrder.items.map((item) => ({
        itemId: item.itemId,
        count: item.count,
      })),
      totalPrice: storeOrder.storeTotalPrice,
      deliveryFee: storeOrder.deliveryFee,
      storeTotalPayment: storeOrder.grandTotal,
      orderedOn: new Date().toLocaleString(),
      checkoutDetails: {
        name,
        email,
        phone,
        alternatePhone,
        address,
        postOffice,
        district,
        country,
      },
    }));

    setOrders(updatedOrders);
  };

  if (!checkout) {
    return (
      <div className="flex-1 bg-base-100 rounded-lg p-4 min-h-screen">
        <h1 className="text-3xl font-bold p-1 m-1">Your Cart</h1>
        <CartTable
          groupedItemsByStoreCentral={setGroupedByStore}
          selectedItemsCentral={selectedItems}
          setSelectedItemsCentral={setSelectedItems}
          checkoutCentral={setCheckout}
          sellersCentral={setSellers}
        />
        {/* <h1 className="overflow-x-auto">{JSON.stringify(selectedItems)}</h1> */}
      </div>
    );
  } else {
    return (
      <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
        <h1 className="text-3xl font-bold p-1 m-1">Checkout Items:</h1>
        <CheckoutTable
          groupedItemsByStore={groupedByStore}
          selectedItems={selectedItems}
          onOrdersCreated={handleOrdersCreated}
          sellers={sellers}
          // district={"Dhaka"}
        />

<h1 className="text-3xl font-bold p-1 m-1">Checkout Details:</h1>

<div className="grid grid-cols-2 gap-4 m-3 rounded-md">
  <div>
    <label className="font-bold">Name:</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="input input-bordered w-full mt-1"
    />
  </div>

  <div>
    <label className="font-bold">Email:</label>
    <input
      type="email"
      value={email}
      // onChange={(e) => setEmail(e.target.value)}
      className="input input-bordered w-full mt-1"
      contentEditable={false}
    />
  </div>

  <div>
    <label className="font-bold">Phone:</label>
    <input
      type="text"
      value={phone}
      // onChange={(e) => setPhone(e.target.value)}
      className="input input-bordered w-full mt-1"
      contentEditable={false}
    />
  </div>

  <div>
    <label className="font-bold">Alternate Phone No:</label>
    <input
      type="text"
      placeholder="optional"
      value={alternatePhone}
      onChange={(e) => setAlternatePhone(e.target.value)}
      className="input input-bordered w-full mt-1"
    />
    {/* <span className="badge badge-info">Optional</span> */}
  </div>

  <div>
    <label className="font-bold">Address:</label> <br />
    <textarea
      className="textarea textarea-bordered w-full"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    ></textarea>
  </div>

  <div>
    <label className="font-bold">Post Office:</label>
    <input
      type="text"
      value={postOffice}
      onChange={(e) => setPostOffice(e.target.value)}
      className="input input-bordered w-full mt-1"
    />
  </div>

  <div>
    <label className="font-bold">District:</label>
    <input
      type="text"
      value={district}
      onChange={(e) => setDistrict(e.target.value)}
      className="input input-bordered w-full mt-1"
    />
  </div>

  <div>
    <label className="font-bold">Country:</label>
    <input
      type="text"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className="input input-bordered w-full mt-1"
    />
  </div>
</div>
<div className="grid w-full place-content-center">
  <button
    className="btn btn-primary justify-center w-40 m-4"
    onClick={
      () => {
        // handlePlaceOrder();
        console.log("Order Placed");
      }
    }
  >
    Place Order
  </button>
</div>

{/* <div className="w-full overflow-x-auto text-blue-700">
  orders: {JSON.stringify(orders)}
</div> */}

{/* {showAlert && (
  <div
    role="alert"
    className="alert alert-success flex items-center mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
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
)} */}
      </div>
    );
  }
};

export default MiddleLayoutCart;
