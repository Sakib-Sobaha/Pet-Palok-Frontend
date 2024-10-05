import React from "react";
import { useState, useEffect } from "react";
import CommunityPost from "../post/community-post";
import CreatePost from "../modals/create-community-post";

function CommunityFeed({ _community }) {
  const [community, setCommunity] = useState(_community);
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <h1>{}</h1>
      <CreatePost element_id={"create_post_modal"} _community={community} />
      <button className="btn btn-primary w-32 m-1"
        onClick={() => {
          document.getElementById("create_post_modal").showModal();
        }}
      >
        +
        Create Post
      </button>
      {posts.length === 0 ? (<p className="italic text-xl text-center">No posts found.</p>) : 
      (
        <p className="italic text-xl text-center mb-4">{posts.length} posts</p>
      )}
      {posts.map((post) => (
        <CommunityPost key={post.id} _post={post} />
      ))}
    </div>
  );
}

export default CommunityFeed;
