import React, { useEffect, useState } from "react";
import Card from "./community-cards-large";

const CommunitieSuggestions = () => {
  const [communities, setCommunities] = useState([]);
  const imageUrl = "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5fGVufDB8fDB8fHww";

  useEffect(() => {
    // Fetch communities for suggestion
    const fetchCommunities = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACK_END}/user/communities/suggest`;
        const token = localStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Suggested for You</h1>
      <div className="grid grid-cols-1">
        {communities.length > 0 ? (
          communities.map((community) => (
            <Card
              key={community.id}
              title={community.name}
              image={imageUrl}
              description={community.tagline}
              params={community}
            />
          ))
        ) : (
          <p>No communities available</p>
        )}
      </div>
    </div>
  );
};

export default CommunitieSuggestions;
