import "./App.css";

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

import Home from "./pages/home.js";
import Login from "./pages/login.js";
import About from "./pages/about.js";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
export default function App() {
  return (
    // <div>
    //   <label className="flex cursor-pointer gap-2">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="20"
    //       height="20"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <circle cx="12" cy="12" r="5" />
    //       <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    //     </svg>
    //     <input
    //       type="checkbox"
    //       value="night"
    //       className="toggle theme-controller"
    //     />
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="20"
    //       height="20"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    //     </svg>
    //   </label>
    //   <h1 className="text-3xl font-bold underline">Hello world!</h1>

    //   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //     Button
    //   </button>

    //   <button className="btn btn-info">Info</button>
    //   <button className="btn btn-success">Success</button>
    //   <button className="btn btn-warning">Warning</button>
    //   <button className="btn btn-secondary">Error</button>

    //   <button className="btn glass">Glass button</button>

    //   {/* You can open the modal using document.getElementById('ID').showModal() method */}
    //   <button
    //     className="btn"
    //     onClick={() => document.getElementById("my_modal_4").showModal()}
    //   >
    //     open modal
    //   </button>
    //   <dialog id="my_modal_4" className="modal">
    //     <div className="modal-box w-11/12 max-w-5xl">
    //       <h3 className="font-bold text-lg">Hello!</h3>
    //       <p className="py-4">Click the button below to close</p>
    //       <div className="modal-action">
    //         <form method="dialog">
    //           {/* if there is a button, it will close the modal */}
    //           <button className="btn">Close</button>
    //         </form>
    //       </div>
    //     </div>
    //   </dialog>
    // </div>
    <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </Router>
  );
}
