import React from "react";
import PetContainerCarousel from "../components/containers/PetCardCarousel.js";
import MarketContainerCarousel from "../components/containers/MarketCarousel.js";
import logo from "../images/logo.png";

// import LeftLayout from "../components/LeftLayout";
// import MiddleLayout from "../components/MiddleLayoutLandingPage.js";
// import RightLayout from "../components/RightLayout";
// import LayoutLRM from "../components/LayoutLRM";
function LandingPage() {
  return (
    <div>
      {/* <LayoutLRM
        left={<LeftLayout />}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      /> */}
      {/* Starting page, niche bivinno container dekhabo jinish er*/}
      <div
        className="hero h-[90vh] bg-cover relative" // Set the parent container to be relative
        style={{
          backgroundImage: `url(${logo})`, // Use the image as a background
        }}
      >
        {/* Overlay with 50% opacity */}
        <div
          className="absolute inset-0 bg-black opacity-50" // Full cover overlay
          style={{
            backgroundColor: "rgba(30, 10, 20, 0.9)", // Black with 50% opacity
          }}
        />

        {/* Content on top of the overlay */}
        <div className="hero-content text-neutral-content text-center relative z-10">
          <div className="max-w-md">
            <h1 className="mb-10 text-7xl font-bold text-white-100 hover:text-white">Hello there</h1>
            <p className="mb-5 text-white-100 text-2xl hover:text-white font-bold">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="">
        <PetContainerCarousel />
        <MarketContainerCarousel />
      </div>
    </div>
  );
}

export default LandingPage;
