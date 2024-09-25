import React from "react";

const RightLayout = () => {
  const handleChatRoomRedirect = () => {
    window.location.href = "http://localhost:3000/chatroom"; // Redirect to chatroom
  };

  const handleGPTRedirect = () => {
    window.location.href = "http://localhost:3000/gpt"; // Redirect to GPT
  };

  const handlePricePredictorRedirect = () => {
    window.location.href = "http://localhost:3000/pricePredictor"; // Redirect to PricePredictor
  }

  return (
    <div className="flex-1 bg-base-100 p-4 min-h-screen h-full rounded-lg">
      {/* Your content for RightLayout */}
      {/* <button
        className="btn btn-outline btn-secondary dark:bg-transparent"
        onClick={handleChatRoomRedirect} // Call the function on button click
      >
        Enter ChatRoom
      </button>
      */}
      <button
        className="btn btn-outline btn-secondary dark:bg-transparent"
        onClick={handleGPTRedirect} // Call the function on button click
      >
        Ask GPT
      </button>

      <button
        className="btn btn-outline btn-secondary dark:bg-transparent"
        onClick={handlePricePredictorRedirect} // Call the function on button click
      >
        Price Predictor
      </button>
      
      
    </div>
  );
};

export default RightLayout;
