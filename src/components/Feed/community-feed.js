import React from "react";
import { useState, useEffect } from "react";
import CommunityPost from "../post/community-post";
import CreatePost from "../modals/create-community-post";

function CommunityFeed({ _community, _isMember }) {
  const [community, setCommunity] = useState(_community);
  const [posts, setPosts] = useState([]);
  const [isMember, setIsMember] = useState(_isMember);
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(false);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchWhoAmI = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/` + userType + `/whoami`;
        const token = localStorage.getItem("authToken");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setVisitor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchWhoAmI();
  }, [userType]);

  const fetchData = async (url, token) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const url = `${process.env.REACT_APP_API_URL}/communityPost/${community.id}`;
    fetchData(url, token)
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [community]);

  // useEffect(() => {
  //   if (userType === "user") {
  //     setIsMember(community?.userList?.includes(visitor?.id));
  //   } else if (userType === "seller") {
  //     setIsMember(community?.sellerList?.includes(visitor?.id));
  //   } else if (userType === "vet") {
  //     setIsMember(community?.vetList?.includes(visitor?.id));
  //   } else setIsMember(false);
  // }, [community, visitor, userType, community?.userList, community?.sellerList, community?.vetList]);

  if (loading) {
    return (
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
    );
  } else {
    if (!_isMember) {
      return (
        <div>
          <h1>{}</h1>
          <p className="italic text-xl text-center">
            You must be a member of this community to view posts.
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{}</h1>
          <CreatePost element_id={"create_post_modal"} _community={community} />
          <button
            className="btn btn-primary w-32 m-1"
            onClick={() => {
              document.getElementById("create_post_modal").showModal();
            }}
          >
            + Create Post
          </button>
          {posts.length === 0 ? (
            <p className="italic text-xl text-center">No posts found.</p>
          ) : (
            <p className="italic text-xl text-center mb-4">
              {posts.length} posts
            </p>
          )}
          {posts.map((post) => (
            <CommunityPost key={post.id} _post={post} />
          ))}
        </div>
      );
    }
  }
}

export default CommunityFeed;
