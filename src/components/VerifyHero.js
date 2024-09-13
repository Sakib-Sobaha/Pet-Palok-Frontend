import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';




const Verification = ({type, title, text, icon, verifyURL, resendURL}) => {
  const [activeTab, setActiveTab] = useState("verify");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState(""); // State for verification error message
  const [showSuccessAlert, setShowSuccessAlert ] = useState(false); // State for successful verification alert
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60); // Timer set to 60 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
    // `window.location.href` = 
  };

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    // Retrieve the 'email' parameter from the URL
    const userEmail = query.get("email");

    if (userEmail) {
      setEmail(userEmail);
    }
  }, [query]);

  const handleResend = async (e) => {
    // Reset the timer and resend OTP logic here
    e.preventDefault();
    try {
      const response = await fetch(resendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        console.error("Failed to resend OTP");
        return;
      }

      setVerificationError(""); // Clear any previous error message
      setTimer(60);
      setIsResendDisabled(true);

    } catch (error) {
      console.error("Resend error:", error);
    }
    
  };

  const handleSubmit = async (e) => {
    const otpCode = otp.join("");
    console.log("Entered OTP is: ", otpCode);
    console.log("email: ", email, "verificationCode: ", otpCode);
    // Add your verify OTP logic here
    e.preventDefault();
    
    try {
      const response = await fetch(verifyURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ email: email, verificationCode: otpCode }),
        
      });

      

      if (!response.ok) {
        setVerificationError("Invalid OTP. Please try again."); // Set error message if verification fails
        setShowSuccessAlert(false); // Hide success alert if there's an error
        return;
      }

      // const data = await response.json();
      // const token = data.token;

      // // Store token in local storage
      // localStorage.setItem("authToken", token);

      // localStorage.setItem("userType", type.toLowerCase());

      // Show success alert
      setShowSuccessAlert(true);
      setVerificationError(""); // Clear any previous error message

      alert("Verification successful! Please login to continue.");

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = `/login`;
      }, 500);
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationError("An error occurred during verification. Please try again."); // Set error message on catch
    }

  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setVerificationError(""); // Clear any previous error message
    setShowSuccessAlert(false); // Hide success alert if there's an error
  };

  return (
    <div className="hero bg-base-200 min-h-[60vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left pl-8">
          <div className=""> {icon} </div>
          <h1 className="text-2xl font-bold font-serif text-center">{title}</h1>
          <p className="py-6 text-center font-sans">{text}</p>
          <h1 className="text-2xl font-bold font-serif text-center">OTP Verification</h1>
          <p className="py-6 text-center font-sans">Please enter the OTP sent to your email</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            {/* OTP input fields */}
            <div className="flex justify-center space-x-4 mb-6">
              {otp.map((data, index) => (
                <input
                  className="w-12 h-12 text-center border-2 border-primary rounded-full focus:outline-none focus:border-secondary"
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>

            {/* Resend OTP */}
            <p className="text-primary-content dark:text-current mb-4 text-center font-serif">
              {timer > 0 ? (
                `Resend OTP in ${timer}s`
              ) : (
                <span
                  className="text-blue-500 cursor-pointer font-serif"
                  onClick={handleResend}
                  disabled={isResendDisabled}
                >
                  Resend
                </span>
              )}
            </p>

            {/* Verify Button */}
            <button
              className="btn btn-primary py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200 font-serif w-full"
              onClick={handleSubmit}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
