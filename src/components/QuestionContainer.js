import React, { useState, useEffect } from "react";
import SingleQuestion from "./questions/SingleQuestion";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const fetchQuestionAPI = async (token, itemId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/item/comment/fetchCommentByItem/${itemId}`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (response.status === 401) {
      handleLogout(); // Token is likely expired, logout the user
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok. Status: ${response.status}, ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch item", error);
    return null; // Return null in case of an error
  }
};

// Update the API function to handle posting new questions
const newQuestionAPI = async (token, newQuestionData) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/marketplace/item/comment/create`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newQuestionData),
    };

    const response = await fetch(url, requestOptions);

    if (response.status === 401) {
      handleLogout(); // Token is likely expired, logout the user
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok. Status: ${response.status}, ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to post new question", error);
    return null; // Return null in case of an error
  }
};

const QuestionContainer = ({ _itemId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const [newQuestionText, setNewQuestionText] = useState(""); // State for the new question text
  const [anonymous, setAnonymous] = useState("Non-Anonymous");

  const token = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType"); // Get user type from local storage

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      const fetchedQuestions = await fetchQuestionAPI(token, _itemId);
      if (fetchedQuestions) {
        setQuestions(fetchedQuestions);
      } else {
        setError("Failed to fetch questions."); // Set error message
      }
      setLoading(false);
    };
    fetchData();
  }, [_itemId, token]); // Added missing dependencies to useEffect

  const handleNewQuestionSubmit = async () => {
    if (!newQuestionText) {
      setError("Question text is required.");
      return;
    }

    const newQuestionData = {
      text: newQuestionText,
      marketItemId: _itemId,
      userType: userType,
      anonymous: anonymous === "Anonymous",
    };

    const result = await newQuestionAPI(token, newQuestionData);
    if (result) {
      setQuestions((prevQuestions) => [...prevQuestions, result]); // Update the questions state with the new question
      setNewQuestionText(""); // Clear the input after successful submission
      setAnonymous("Non-Anonymous"); // Reset the anonymous option
    } else {
      setError("Failed to create a new question."); // Set error message on failure
    }
  };

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div>
      <div className="collapse bg-secondary">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex">
          <svg
            id="Layer_1"
            version="1.1"
            viewBox="0 0 256 256"
            className="h-8 w-8 mr-4 fill-current stroke-current"
            strokeWidth="8"
          >
            <g>
              <path d="M177.4,24.1c-27.5-4.1-55.8,5.3-75.7,25c-2,1.9-2,5.1,0,7c1.9,1.9,5.1,2,7,0c17.7-17.5,42.8-25.8,67.3-22.2   c40,5.9,69.1,40.7,67.8,81c-0.1,3.1-0.3,53.9-0.5,103.1l0,4.1l-49.5-36l-2.5,0.9c-13.3,4.8-27.7,5.9-41.7,3.2   c-20.9-4-39-16.1-50.9-33.9c-1.5-2.3-4.6-2.9-6.9-1.4c-2.3,1.5-2.9,4.6-1.4,6.9c13.4,20,33.7,33.6,57.3,38.1   c14.9,2.9,30.2,1.9,44.4-2.7l46.5,33.8c1.6,1.1,3.5,1.7,5.4,1.7c1.4,0,2.9-0.3,4.2-1c3.1-1.6,5-4.7,5-8.1l0-5.5   c0.1-29.8,0.4-99.5,0.5-102.9C255.2,69.9,222.4,30.7,177.4,24.1z" />
              <path d="M48,212.7c-4.1,0-7.5,3.4-7.5,7.6c0,4.1,3.4,7.6,7.5,7.6c2.2,0,4.1-0.8,5.5-2.3c1.4-1.4,2.2-3.4,2.1-5.5   C55.6,215.9,52.3,212.7,48,212.7z" />
              <path d="M100.3,80.1C91.9,64,73.5,53.6,53.4,53.6c-22.7,0-41.7,12.7-50.8,34c-1.1,2.5,0.1,5.4,2.6,6.5c2.5,1.1,5.4-0.1,6.5-2.6   c7.5-17.5,23-28,41.6-28c16.5,0,31.4,8.3,38,21.1c4.3,8.6,7,22.3-5,38.8c-6,8.3-13.8,14-20.1,18.7c-8.2,6-14.3,10.9-17.5,18   c-3.3,7.1-4.8,17.2-4.9,31.6c0,2.7,2.2,5,4.9,5c0,0,0,0,0,0c2.7,0,4.9-2.2,5-4.9c0.1-13,1.4-21.7,4.1-27.6   c2.2-4.9,7.1-8.7,14.4-14.1c6.8-5,15.3-11.3,22.2-20.7C110.2,107.6,104.9,89.2,100.3,80.1z" />
            </g>
          </svg>
          View Q & A
        </div>

        <div className="collapse-content">
          {loading && <div>Loading...</div>}
          {/* Iterate over all fetched questions */}

          {!loading &&
            questions.map((question) => (
              <SingleQuestion key={question.id} _comment={question} />
            ))}

          <div className="flex mt-2 mx-1 bg-base-200 rounded-lg">
            <input
              type="text"
              placeholder="Write a Question?"
              className="input input-bordered border-1 input-secondary w-full rounded-lg"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)} // Update text state
            />
            <select
              className="select select-bordered border-1 ml-0.5 w-40 select-secondary rounded-lg"
              value={anonymous}
              onChange={(e) => setAnonymous(e.target.value)} // Correctly update anonymous state
            >
              <option disabled>Select type</option>
              <option value="Anonymous">Anonymous</option>
              <option value="Non-Anonymous">Non-Anonymous</option>
            </select>

            <button
              className="btn btn-md rounded-lg ml-0.5 w-32 btn-ghost border-2 border-base-300"
              onClick={handleNewQuestionSubmit} // Call the submit handler
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionContainer;
