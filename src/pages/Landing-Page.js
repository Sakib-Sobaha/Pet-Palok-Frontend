import React from "react";
import PetContainerCarousel from "../components/containers/PetCardCarousel.js";
import MarketContainerCarousel from "../components/containers/MarketCarousel.js";

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
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/1388281684/vector/seamless-dog-pattern-with-paw-prints-bones-hearts-and-balls-cat-foot-texture-pattern-with.jpg?s=612x612&w=0&k=20&c=St1dISSnU7zobbE4y1VWD7hhEnWcUGriSVZ5ocoSYWU=)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Hello there</h1>
            <p className="mb-5 text-white">
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
