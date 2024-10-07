import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api-fetch-functions/fetch-whoami";

function CommunityCard({ community }) {
  const lenMax = 6;
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const image = community && community?.image;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const totalMembers =
    (community?.userList?.length || 0) +
    (community?.vetList?.length || 0) +
    (community?.sellerList?.length || 0);

  const visitProfile = () => {
    window.location.href = `/community/${community?.id}`;
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    const fetchUser = async () => {
      setLoading(true);
      const data = await fetchUserData(`/${userType}/whoami`); // Use the reusable fetch function
      if (data) {
        setUser(data);
        setUserId(data.id);

        // Check if user is part of the community based on userType
        let isUserInCommunity = false;

        if (userType === "user") {
          isUserInCommunity = community?.userList.includes(data.id);
        } else if (userType === "vet") {
          isUserInCommunity = community?.vetList.includes(data.id);
        } else if (userType === "seller") {
          isUserInCommunity = community?.sellerList.includes(data.id);
        }

        setIsMember(isUserInCommunity);
      }
      setLoading(false);
    };

    fetchUser();
  }, [community]);

  const handleJoinCommunity = () => {
    const communityId = community?.id;

    if (!communityId) {
      console.error("Community ID is missing.");
      return;
    }

    const joinUrl = `${process.env.REACT_APP_API_URL}/communities/join/${communityId}`;
    const requestBody = {
      userType: localStorage.getItem("userType"),
    };

    console.log("Joining community with data:", requestBody);

    // Check if the token exists
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Authorization token is missing.");
      alert("Authorization token is missing. Please log in.");
      return;
    }

    fetch(joinUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure that this is being sent correctly
      },
      body: JSON.stringify(requestBody), // Ensure that the requestBody is being sent as JSON
    })
      .then(async (response) => {
        const responseData = await response.json(); // Extract the response
        if (response.ok) {
          alert("Successfully joined the community!");
          setIsMember(true); // Update state
          // setTotalMembers(totalMembers + 1); // Update the total members count
        } else {
          console.error("Failed to join community:", responseData);
          alert(
            `Failed to join community: ${
              responseData.message || "Unknown error"
            }`
          );
        }
      })
      .catch((error) => {
        console.error("Error while trying to join community:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const handleLeaveCommunity = () => {
    const leaveUrl = `${process.env.REACT_APP_API_URL}/communities/leave/${community?.id}`;

    fetch(leaveUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ userType: localStorage.getItem("userType") }),
    })
      .then((response) => {
        if (response.ok) {
          // If the response is ok (successful leave)
          alert("Successfully left the community!");
          setIsMember(false); // Update the state to reflect the membership
          // setTotalMembers(totalMembers - 1); // Update the total members count
        } else if (response.status === 424) {
          // If the response status is 424 (HttpStatus.FAILED_DEPENDENCY)
          alert(
            "You are the last admin of this community. You must delete the community instead of leaving."
          );
        } else {
          console.error("Failed to leave community");
          alert(
            "An error occurred while leaving the community. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Failed to leave community", error);
        alert(
          "Failed to leave community. Please check your network connection and try again."
        );
      });
  };

  if (loading)
    return (
      <div>
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  else
    return (
      <div className="card card-compact bg-base-100 shadow-xl m-1 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
        <figure>
          <img
            src={image}
            alt={community?.name}
            className="rounded-t-lg h-48 object-cover w-full"
          />
        </figure>
        <div className="card-body">
          <div className="flex flex-row">
            <h2 className="card-title font-bold mr-2">{community?.name}</h2>
          </div>

          <p className="text-justify">
            {isExpanded || community?.description.split(" ").length <= lenMax
              ? community?.description
              : `${community?.description
                  .split(" ")
                  .slice(0, lenMax)
                  .join(" ")}...`}
            {community?.description.split(" ").length > lenMax && (
              <button onClick={toggleDescription} className="text-primary ">
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
          </p>

          <span className="badge badge-primary">
            {totalMembers} {totalMembers === 1 ? "member" : "members"}
          </span>

          <div className="card-actions grid-cols-1 grid">
            <button
              className="btn btn-primary rounded-lg"
              onClick={visitProfile}
            >
              Visit Community
            </button>

            {isMember ? (
              <button
                className="btn btn-error rounded-lg"
                onClick={handleLeaveCommunity}
              >
                Leave Community
              </button>
            ) : (
              <button
                className="btn btn-accent rounded-lg"
                onClick={handleJoinCommunity}
              >
                Join Community
              </button>
            )}

            {user && user.id === community?.ownerId && (
              <button
                className="btn btn-error rounded-lg"
                onClick={() => {
                  const deleteUrl = `${process.env.REACT_APP_API_URL}/community/delete/${community?.id}`;
                  fetch(deleteUrl, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  })
                    .then((response) => {
                      if (response.ok) {
                        alert("Community deleted successfully");
                        window.location.href = "/user/communities";
                      } else {
                        console.error("Failed to delete community");
                      }
                    })
                    .catch((error) => {
                      console.error("Failed to delete community", error);
                    });
                }}
              >
                Delete Community
              </button>
            )}
          </div>
        </div>
      </div>
    );
}

export default CommunityCard;
