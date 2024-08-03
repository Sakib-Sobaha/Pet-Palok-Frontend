import React, { useState, useEffect } from "react";

const SingleComment = ({ userId, text, date }) => {
  const [author, setAuthor] = useState(null); // Initialize username as an empty string
  const [loading, setLoading] = useState(true); // Add loading state to handle fetching username

  const calculateTimeDifference = (dateString) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = Math.abs(currentDate - postDate);

    // Convert time difference to minutes, hours, or days as appropriate
    if (timeDifference < 60000) {
      return "Just now";
    } else if (timeDifference < 3600000) {
      const minutes = Math.floor(timeDifference / 60000);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < 86400000) {
      const hours = Math.floor(timeDifference / 3600000);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(timeDifference / 86400000);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACK_END}/user/getUser/${userId}`;
        const token = localStorage.getItem("token");
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Failed to fetch username");
        }
        const data = await response.json();
        console.log(data);
        setAuthor(data); // Set username to the fetched data
      } catch (error) {
        console.error("Error fetching username:", error);
      } finally {
        // setLoading(false); // Update loading state after fetching username
      }
    };

    fetchUser();
  }, []);
  // Render loading message if still loading or username is not a string
  // if (loading || typeof username !== "string") {
  //   return <div>Loading username...</div>;
  // }

  return (
    <div className="border border-primary rounded-lg mb-2 p-2 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        // fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-4 mb-1 mt-1 ml-1"
      >
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v11l-4 4z"></path>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v11l-4 4z"></path>
        <line x1="15" y1="10" x2="21" y2="10"></line>
        <line x1="15" y1="14" x2="21" y2="14"></line>
        <line x1="15" y1="18" x2="21" y2="18"></line>
      </svg>

      <div>
        <div className="">
          <h1 className="font-bold text-primary">{author && author.name}</h1>{" "}
        </div>
        {/* Render username directly */}
        <h1 className="font-semibold">{text}</h1>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            id="clock"
            width="20"
            height="20"
            stroke="white"
            className="mr-1 justify-center"
          >
            <path d="M12,6a.99974.99974,0,0,0-1,1v4.38379L8.56934,12.60693a.99968.99968,0,1,0,.89843,1.78614l2.98145-1.5A.99874.99874,0,0,0,13,12V7A.99974.99974,0,0,0,12,6Zm0-4A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"></path>
          </svg>
          <p>{calculateTimeDifference(date)}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
