import React, { useState } from "react";
import PropTypes from "prop-types";

function LoginHero({ title, text,icon }) {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="hero bg-base-200 min-h-[60vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left pl-8">
        <div className="">
        {icon}

        </div>
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
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
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
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          )}
          {activeTab === "signup" && (
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
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
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
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
};

export default LoginHero;
