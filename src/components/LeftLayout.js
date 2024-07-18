import React from 'react';
import Menu from "./Menu-LeftSidebar";
const LeftLayout = ({type}) => {
  return (
    <div className="flex-1 bg-base-300 p-4 h-screen rounded-lg border border-gray-300">
      {/* Your content for LeftLayout */}
      <Menu type = {type}/>
    </div>
  );
};

export default LeftLayout;
