import React, { useEffect } from "react";

function CheckoutTable({ district, onOrdersCreated, groupedItemsByStore, sellers, selectedItems }) {
  const deliveryFee = district === "Dhaka" ? 65 : 120;

  // Helper function to get store details
  const getStoreDetails = (storeId) => {
    const seller = sellers.find((s) => s.id === storeId);
    return seller ? seller.storeName : "Unknown Store";
  };

  // Compute totals for each store
  const computeStoreTotals = () => {
    return Object.keys(groupedItemsByStore)
      .map((storeId) => {
        // Filter items based on selected cartItemId
        const items = groupedItemsByStore[storeId].filter(item => selectedItems.includes(item.cartItemId));
        if (items.length === 0) return null; // Skip stores with no selected items

        const storeName = getStoreDetails(storeId); // Use seller ID to get store name
        const storeTotalPrice = items.reduce((total, item) => total + (item.pricePerUnit * item.count), 0);
        const storeTotalPayment = storeTotalPrice + deliveryFee;

        return {
          storeName,
          storeId,
          items,
          totalPrice: storeTotalPrice,
          deliveryFee: deliveryFee,
          storeTotalPayment: storeTotalPayment,
        };
      })
      .filter(store => store !== null); // Remove null values (stores with no selected items)
  };

  const storeTotals = computeStoreTotals();

  useEffect(() => {
    onOrdersCreated(storeTotals);
  }, [storeTotals, onOrdersCreated]);

  return (
    <div className="overflow-x-auto grid place-content-center">
      {storeTotals.map((store) => {
        return (
          <div key={store.storeId} className="mb-4">
            <h2 className="text-xl font-bold mb-2">{store.storeName}</h2>
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
                {store.items.map((item, index) => (
                  <tr key={item.cartItemId + index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.images[0]} alt={item.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.pricePerUnit} Taka</td>
                    <td className="justify-center">{item.count}</td>
                    <td>{item.pricePerUnit * item.count} Taka</td>
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
