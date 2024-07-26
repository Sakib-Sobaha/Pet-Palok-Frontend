import React from "react";

import CheckoutTable from "./cart/CheckoutTable";

const cartItems = [
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

const user = {
  firstname: "Niloy",
  lastname: "Faiaz",
  email: "niloy870@gmail.com",
  phone: "01234123456",
  password: "pasword",
  address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
  postOffice: "Mirpur-2",
  district: "Dhaka",
  country: "Bangladesh",
  DOB: "2020-01-01",
  gender: "male",
  about:
    "Chokkor is a cute dog! He is a very good friend! I pass most of my time with him. Soo friendly. My beloved! Doggy doggy doggy dogyy. Cutie pie amar. I love him too too too too much",
  rating_buysellexch: "4",
  rating_petkeeping: "5",
  rating_vet: "3",
};

const MiddleLayoutCheckout = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");

  const handlePlaceOrder = () => {
    // iff success ....
      setAlertText("Order placed successfully!");

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      // sleep 1s

      window.location.href = "/user/home";
    
  };

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">

      <h1 className="text-3xl font-bold p-1 m-1">Checkout Items:</h1>
      <CheckoutTable district={user.district}/>

      <h1 className="text-3xl font-bold p-1 m-1">Checkout Details:</h1>

      <div className="grid grid-cols-2 gap-4 m-3">
        <div>
          <label className="font-bold">Name:</label>
          <input
            type="text"
            value={user.firstname + " " + user.lastname}
            className="input input-bordered w-full mt-1"
            readOnly
          />
        </div>

        <div>
          <label className="font-bold">Email:</label>
          <input
            type="email"
            value={user.email}
            className="input input-bordered w-full mt-1"
            readOnly
          />
        </div>

        <div>
          <label className="font-bold">Phone:</label>
          <input
            type="text"
            value={user.phone}
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label className="font-bold">Alternate Phone No:</label>
          <input
            type="text"
            placeholder="optional"
            className="input input-bordered w-full mt-1"
          />
          {/* <span className="badge badge-info">Optional</span> */}
        </div>

        <div>
          <label className="font-bold">Address:</label> <br/>
          <textarea
            className="textarea textarea-bordered w-full"
            value={user.address}
          ></textarea>
        </div>

        <div>
          <label className="font-bold">Post Office:</label>
          <input
            type="text"
            value={user.postOffice}
            className="input input-bordered w-full mt-1"
            
          />
        </div>

        <div>
          <label className="font-bold">District:</label>
          <input
            type="text"
            value={user.district}
            className="input input-bordered w-full mt-1"
            
          />
        </div>

        <div>
          <label className="font-bold">Country:</label>
          <input
            type="text"
            value={user.country}
            className="input input-bordered w-full mt-1"
            
          />
        </div>
      </div>
      <div className="grid w-full place-content-center">
      <button className="btn btn-primary justify-center w-40 m-4"
        onClick={handlePlaceOrder}
      >Place Order</button>
      </div>

      {showAlert && (
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
      )}
      
    </div>
  );
};

export default MiddleLayoutCheckout;
