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
      </div>
    );
  }
};

export default MiddleLayoutCart;
