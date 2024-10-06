import React from "react";
import { useState, useEffect } from "react";
import FoundPost from "./FoundPost";

const fetchData = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

function FoundContainer({ posts }) {
  const [foundPosts, setFoundPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/foundPost/fetchAll`;

    fetchData(url, token)
      .then((data) => {
        setFoundPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="grid grid-cols-1 m-0 gap-1 w-full overflow-y-auto scroll-smooth max-h-screen ">
        {foundPosts.map((foundPost, index) => (
          <FoundPost key={index} foundPost={foundPost} />
        ))}
      </div>
    );
}
export default FoundContainer;
