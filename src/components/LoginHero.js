import React, { useState } from "react";
import PropTypes from "prop-types";
// import jwtDecode from "jwt-decode";
// import crypto from 'crypto'; // For password hashing in the front-end

function LoginHero({ type, title, text, icon, loginURL, signupURL }) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // const getUserIdFromToken = (token) => {
  //   try {
  //     const decoded = jwtDecode(token);
  //     return decoded.id; // Or whatever key contains the user ID
  //   } catch (error) {
  //     console.error("Invalid token:", error);
  //     return null;
  //   }
  // };

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
        console.error("Login failed");
        return;
      }

      const data = await response.json();
      const token = data.token;

      // Store token in local storage
      localStorage.setItem("authToken", token);

      // const userId = getUserIdFromToken(token);
      // localStorage.setItem("userId", userId);
      // console.log(userId);

      localStorage.setItem("userType", type.toLowerCase());
      window.location.href = `/${type.toLowerCase()}/home`;
    } catch (error) {
      console.error("Login error:", error);
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

      // Store token in local storage
      // localStorage.setItem("authToken", token);
      // localStorage.setItem("userType", type.toLowerCase());
      alert("Signup successful! Now Log in with your credentials.");
      activeTab = "login";
      window.location.href = `/landing`;
    } catch (error) {
      console.error("Signup error:", error);
      window.location.href = `/login`;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="hero bg-base-200 min-h-[60vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left pl-8">
          <div className="">{icon}</div>
          {/* <img src="https://www.flaticon.com/free-animated-icon/shopping-cart_15576198?term=shopping&related_id=15576198" /> */}
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
