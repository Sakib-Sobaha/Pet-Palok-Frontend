import { useState, useEffect } from "react";
import React from "react";
import { fetchUserData } from "./api-fetch-functions/fetch-whoami";
import BarChart from "./chart/bar-chart";
import CommunityFeed from "./Feed/community-feed";

const getTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case "food":
      return "badge-success"; // Green background for food
    case "accessories":
      return "badge-info"; // Blue background for accessories
    case "medicine":
      return "badge-error"; // Red background for medicine
    default:
      return "badge-ghost"; // Default gray for unknown types
  }
};
const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // Redirect to the login page
};

const fetchCommunityAPI = async (token, id) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/communities/${id}`;
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

const SingleCommunityMiddleLayout = ({ _communityId }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const token = localStorage.getItem("authToken");
  const [usersList, setUsersList] = useState([]); // State for users
  const [vetsList, setVetsList] = useState([]); // State for vets
  const [sellersList, setSellersList] = useState([]); // State for sellers

  // Fetching community data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedItem = await fetchCommunityAPI(token, _communityId);
      if (fetchedItem) {
        setCommunity(fetchedItem);

        // Calculate total members after community is fetched
        const total =
          (fetchedItem.userList?.length || 0) +
          (fetchedItem.vetList?.length || 0) +
          (fetchedItem.sellerList?.length || 0);
        setTotalMembers(total);

        // Fetch users, vets, and sellers based on their IDs
        const userPromises = fetchedItem.userList.map((id) =>
          fetchUserData(`/user/getUserById/${id}`)
        );
        const vetPromises = fetchedItem.vetList.map((id) =>
          fetchUserData(`/vet/getVetById/${id}`)
        );
        const sellerPromises = fetchedItem.sellerList.map((id) =>
          fetchUserData(`/seller/getSellerById/${id}`)
        );

        // Wait for all user fetches to complete
        const users = await Promise.all(userPromises);
        const vets = await Promise.all(vetPromises);
        const sellers = await Promise.all(sellerPromises);

        setUsersList(users.filter((user) => user)); // Filter out null responses
        setVetsList(vets.filter((vet) => vet)); // Filter out null responses
        setSellersList(sellers.filter((seller) => seller)); // Filter out null responses
      }
      setLoading(false);
    };

    fetchData();
  }, [_communityId, token]);

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    const fetchUser = async () => {
      setLoading(true);
      const data = await fetchUserData(`/${userType}/whoami`);
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        const responseData = await response.json();
        if (response.ok) {
          alert("Successfully joined the community!");
          setIsMember(true);
          setTotalMembers(totalMembers + 1); // Update the total members count
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
          alert("Successfully left the community!");
          setIsMember(false);
          setTotalMembers(totalMembers - 1); // Update the total members count
        } else if (response.status === 424) {
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedItem = await fetchCommunityAPI(token, _communityId);
      if (fetchedItem) {
        setCommunity(fetchedItem);

        // Calculate total members after community is fetched
        const total =
          (fetchedItem.userList?.length || 0) +
          (fetchedItem.vetList?.length || 0) +
          (fetchedItem.sellerList?.length || 0);
        setTotalMembers(total);
      }
      setLoading(false);
    };

    fetchData();
  }, [_communityId, token]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBack = () => {
    window.location.href = "/marketplace";
  };

  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      {loading ? (
        <div className="grid place-items-center">
          <br />
          <div className="h-32"></div>
          <div className="flex">
            <span className="loading loading-ring loading-xs text-primary"></span>
            <span className="loading loading-ring loading-sm text-primary"></span>
            <span className="loading loading-ring loading-md text-primary"></span>
            <span className="loading loading-ring loading-lg text-primary"></span>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
          <img
            src={community?.image}
            alt="store"
            className="w-full h-80 object-cover rounded-lg mb-2"
          />

          <h1 className="text-3xl font-bold">Welcome to {community?.name}</h1>
          {community && (
            <div>
              <h1 className="italic">
                <strong>Topics: </strong>
                {community?.topics.map((topic) => (
                  <span className="badge badge-neutral mx-1">#{topic}</span>
                ))}
              </h1>

              <span className="text-xl font-semibold italic">
                {totalMembers} {totalMembers === 1 ? "member" : "members"}
              </span>
              <br />
              <h1 className="italic">
                <strong>Description: </strong>
                {community?.description}
              </h1>
              {isMember ? (
                <button
                  className="btn btn-error  btn-sm mt-2 mx-1"
                  onClick={handleLeaveCommunity}
                >
                  Leave Community
                </button>
              ) : (
                <button
                  className="btn btn-accent btn-sm mt-2 mx-1"
                  onClick={handleJoinCommunity}
                >
                  Join Community
                </button>
              )}
              {/* <button className="btn btn-secondary btn-sm mt-2 mx-1">
                Send Message
              </button> */}

              {/* All members List */}
              <div>
                <h2 className="text-xl font-bold mt-4">Members:</h2>
                <div className="grid grid-cols-3">
                  {/* Users */}
                  <div>
                    <h3 className="text-lg">Users:</h3>
                    <div className="collapse bg-base-200">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                          {usersList.slice(0, 3).map(
                            (
                              user // Show only the first 3 users
                            ) => (
                              <div className="avatar" key={user.id}>
                                <div className="w-12">
                                  <img
                                    src={user.image}
                                    alt={`${user.firstname} ${user.lastname}`}
                                  />
                                </div>
                              </div>
                            )
                          )}
                          {usersList.length > 3 && (
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content w-12">
                                <span>+{usersList.length - 3}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="collapse-content bg-base-300 w-4/5 rounded-md pt-3 pl-4">
                        {usersList.map((user) => (
                          <p
                            className="font-semibold hover:text-primary hover:cursor-pointer"
                            key={user.id}
                            onClick={() => {
                              window.location.href = `/user/profile/${user.id}`;
                            }}
                          >
                            <div className="avatar">
                              <div className="w-4">
                                <img
                                  src={user.image}
                                  alt={`${user.firstname} ${user.lastname}`}
                                  className="rounded-full"
                                />
                              </div>
                            </div>{" "}
                            {user.firstname} {user.lastname}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vets */}
                  <div>
                    <h3 className="text-lg">Vets:</h3>
                    <div className="collapse bg-base-200">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                          {vetsList.slice(0, 3).map(
                            (
                              vet // Show only the first 3 vets
                            ) => (
                              <div className="avatar" key={vet.id}>
                                <div className="w-12">
                                  <img
                                    src={vet.image}
                                    alt={`${vet.firstname} ${vet.lastname}`}
                                  />
                                </div>
                              </div>
                            )
                          )}
                          {vetsList.length > 3 && (
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content w-12">
                                <span>+{vetsList.length - 3}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="collapse-content bg-base-300 w-4/5 rounded-md pt-3 pl-4">
                        {vetsList.map((vet) => (
                          <p
                            className="font-semibold hover:text-primary hover:cursor-pointer"
                            key={vet.id}
                            onClick={() => {
                              window.location.href = `/vet/profile/${vet.id}`;
                            }}
                          >
                            <div className="avatar">
                              <div className="w-4">
                                <img
                                  src={vet.image}
                                  alt={`${vet.firstname} ${vet.lastname}`}
                                  className="rounded-full"
                                />
                              </div>
                            </div>{" "}
                            {vet.firstname} {vet.lastname}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sellers */}
                  <div>
                    <h3 className="text-lg">Sellers:</h3>
                    <div className="collapse bg-base-200">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                          {sellersList.slice(0, 3).map(
                            (
                              seller // Show only the first 3 sellers
                            ) => (
                              <div className="avatar" key={seller.id}>
                                <div className="w-12">
                                  <img
                                    src={seller.image}
                                    alt={`${seller.firstname} ${seller.lastname}`}
                                  />
                                </div>
                              </div>
                            )
                          )}
                          {sellersList.length > 3 && (
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content w-12">
                                <span>+{sellersList.length - 3}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="collapse-content bg-base-300 w-4/5 rounded-md pt-3 pl-4">
                        {sellersList.map((seller) => (
                          <p
                            className="font-semibold hover:text-primary hover:cursor-pointer"
                            key={seller.id}
                            onClick={() => {
                              window.location.href = `/seller/profile/${seller.id}`;
                            }}
                          >
                            <div className="avatar">
                              <div className="w-4">
                                <img
                                  src={seller.image}
                                  alt={`${seller.firstname} ${seller.lastname}`}
                                  className="rounded-full"
                                />
                              </div>
                            </div>{" "}
                            {seller.name} {}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <BarChart data={salesData} /> */}
              <CommunityFeed _community={community} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleCommunityMiddleLayout;
