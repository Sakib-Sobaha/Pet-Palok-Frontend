import { React, useState } from "react";

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleConfirm = (e) => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (
      passwords.newPassword == "" ||
      passwords.confirmPassword == "" ||
      passwords.currentPassword == ""
    ) {
      alert("Please fill all the fields!");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      alert("Password Changed Successfully!");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  const handleClear = (e) => {
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="justify-center w-full grid place-items-center">
      <div className="w-80 mb-4 ml-3">
        <p className="mr-4 ml-4 font-mono">Current Password:</p>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            type="password"
            className="grow"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
          />
        </label>
      </div>

      <div className="w-80 mb-4 ml-3">
        <p className="mr-4 ml-4 font-mono">New Password:</p>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            type="password"
            className="grow"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
          />
        </label>
      </div>

      <div className="w-80 mb-4 ml-3">
        <p className="mr-4 ml-4 font-mono">Confirm New Password:</p>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
          />
        </label>
      </div>

      <div className="w-full grid grid-cols-2">
        <button
          className="btn btn-accent w-56 rounded-lg p-4 justify-center m-3"
          onClick={handleConfirm}
        >
          {" "}
          Confirm New Password{" "}
        </button>
        <button
          className="btn btn-error w-56 rounded-lg p-4 justify-center m-3"
          onClick={handleClear}
        >
          {" "}
          Clear{" "}
        </button>
      </div>
      {success && (
        <div role="alert" className="alert alert-success">
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
          <span>Password Changed!</span>
        </div>
      )}

      {error && (
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
          <span>Error! Task failed successfully.</span>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
