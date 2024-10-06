import React from "react";

const RightLayout = () => {
  const handleChatRoomRedirect = () => {
    window.location.href = "/chatroom"; // Redirect to chatroom
  };

  const handleGPTRedirect = () => {
    window.location.href = "/gpt"; // Redirect to GPT
  };

  const handlePricePredictorRedirect = () => {
    window.location.href = "http://localhost:3000/pricePredictor"; // Redirect to PricePredictor
  }

  return (
    <div className="flex-1 bg-base-100 p-4 min-h-screen h-full rounded-lg">
      {/* Your content for RightLayout */}
      
      <div className="mb-1">
        <button
          className="btn btn-outline btn-secondary dark:bg-transparent"
          onClick={handleChatRoomRedirect} // Call the function on button click
        >
          Enter ChatRoom
        </button>
      </div>

      <div className="mb-1">
        <button
            className="btn btn-outline btn-secondary dark:bg-transparent"
          onClick={handleGPTRedirect} // Call the function on button click
        >
          Ask GPT
        </button>
      </div>

      <div className="mb-1">
        <button
          className="btn btn-outline btn-secondary dark:bg-transparent mb-1"
          onClick={handlePricePredictorRedirect} // Call the function on button click
        >
          Price Predictor
        </button>
      </div>
      
      
    </div>
  );
};

export default RightLayout;
