import React, { useState } from "react";
import PropTypes from "prop-types";

function LoginHero({ type, title, text, icon, loginURL, signupURL }) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loginError, setLoginError] = useState(""); // State for login error message
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for successful login alert

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (!response.ok) {
        setLoginError("Wrong credentials, please try again."); // Set error message if login fails
        setShowSuccessAlert(false); // Hide success alert if there's an error
        return;
      }

      const data = await response.json();
      const token = data.token;

      // Store token in local storage
      localStorage.setItem("authToken", token);

      localStorage.setItem("userType", type.toLowerCase());

      // Show success alert
      setShowSuccessAlert(true);
      setLoginError(""); // Clear any previous error message

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = `/${type.toLowerCase()}/home`;
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login. Please try again."); // Set error message on catch
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    try {
      const response = await fetch(signupURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
      });

      if (!response.ok) {
        console.error("Signup failed");
        return;
      }

      const data = await response.json();
      const token = data.token;

      // Show signup success message and switch to login tab
      alert("Signup successful! Now Log in with your credentials.");
      setActiveTab("login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setLoginError(""); // Clear error message when switching tabs
    setShowSuccessAlert(false); // Clear success alert when switching tabs
  };

  return (
    <div className="hero bg-base-200 min-h-[60vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left pl-8">
          <div className="">{icon}</div>
          <h1 className="text-5xl font-bold text-center">{title}</h1>
          <p className="py-6 text-center">{text}</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div role="tablist" className="tabs tabs-boxed mb-4">
            <a
              role="tab"
              className={`tab ${activeTab === "login" ? "tab-active" : ""}`}
              onClick={() => handleTabClick("login")}
            >
              Login
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === "signup" ? "tab-active" : ""}`}
              onClick={() => handleTabClick("signup")}
            >
              Sign Up
            </a>
          </div>

          {activeTab === "login" && (
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          )}
          {activeTab === "signup" && (
            <form className="card-body" onSubmit={handleSignup}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  required
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
                {!passwordsMatch && (
                  <p className="text-red-500 text-xs mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
          )}
          {/* Display Error Alert for Login */}
          {loginError && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          {/* Display Success Alert for Login */}
          {showSuccessAlert && (
            <div role="alert" className="alert alert-success ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
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
              <span>Login successful! Redirecting...</span>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

LoginHero.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  loginURL: PropTypes.string.isRequired,
  signupURL: PropTypes.string.isRequired,
};

export default LoginHero;
