// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext.js"; // Import ThemeProvider
import {UserProvider} from "./components/UserContext.js"; // Import UserProvider

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import About from "./pages/about.js";
import UserHome from "./pages/user/user-home.js";
import UserPets from "./pages/user/pets.js";
import PetProfile from "./pages/user/pet-profile.js";
import VetVisit from "./pages/user/vet-visit.js";
import UserProfile from "./pages/user/user-profile.js";
import VetProfile from "./pages/vet/vet-profile.js";
import VetDirectory from "./pages/vet-directory/vet-directory.js";
import SellerProfile from "./pages/seller/seller-profile.js";
import SellerHome from "./pages/seller/seller-home.js";
import SellerMyProducts from "./pages/seller/seller-my-products.js";
import Marketplace from "./pages/marketplace/marketplace.js";
import SingleItem from "./pages/marketplace/single-item.js";
import ChatBox from "./pages/messaging/chat-box.js";
import Cart from "./pages/cart/cart.js";
import Checkout from "./pages/cart/checkout.js";
import EditUserProfile from "./pages/user/edit-user-profile.js";
import LostAndFound from "./pages/user/lost-and-found.js";
import LandingPage from "./pages/Landing-Page.js";
import Appointments from "./pages/vet/appointments.js";
import StoreOrders from "./pages/seller/store-orders.js";
import PetBSX from "./pages/user/pet-bsx.js";


export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/user/home" element={<UserHome />} />
            <Route path="/user/pets" element={<UserPets />} />
            <Route path="/user/pets/:id" element={<PetProfile />} />
            <Route path="/user/vetvisit/:id" element={<VetVisit />} />
            <Route path="/user/profile/:userId" element={<UserProfile />} />
            <Route path="/user/profile/edit" element={<EditUserProfile />} />


            <Route path="/user/petbsx" element={<PetBSX />} />

            <Route path="/user/lost-and-found" element={<LostAndFound />} />

            <Route path="/vet/profile/:vetId" element={<VetProfile />} />

            <Route
              path="/seller/profile/:sellerId"
              element={<SellerProfile />}
            />
            <Route path="/seller/home" element={<SellerHome />} />
            <Route path="/seller/my-products" element={<SellerMyProducts />} />
            <Route path="/seller/orders" element={<StoreOrders />} />

            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/item" element={<SingleItem />} />

            <Route path="/vetDirectory" element={<VetDirectory />} />
            <Route path="/vet/appointments" element={<Appointments />} />

            <Route path="/chatbox" element={<ChatBox />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />

            <Route path="/landing" element={<LandingPage />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}
