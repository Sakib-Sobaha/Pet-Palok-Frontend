import React, { useState } from "react";
import { useEffect } from "react";

function CreateCommunityPost({communityId}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your logic to handle the submission of the community post
    // For demonstration purposes, we're logging the title and content to the console
    const url = `${process.env.NEXT_PUBLIC_BACK_END}/user/communities/post/create/${communityId}`;

    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    // Data to be sent in the request body
    const data = {
      "title": title,
      "content": content,
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        
      };
    //   console.log(requestOptions.body);

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      // Handle success
      console.log("post created successfully");
      alert("post created successfully");
      //redirect to the community page of communityId
      window.location.href = `/communities/${communityId}`;

      
      // window.location.href = "/user/communities/}";
      // You can redirect the user to another page or perform any other action upon successful creation
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating Post");
      // Handle error
    }
    // You can send a request to your backend API to create the post here
    
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-4">Create Community Post</h1>

      <div className="card w-full bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20200617/pngtree-background-frame-geometric-with-neon-glow-and-bright-colors-can-be-image_339492.jpg"
            alt="Shoes"
            className="w-full"
          />
        </figure>
        <div className="card-body">
          <h1 className="font-bold">Enter Post Headline</h1>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs text-black"
            value={title}
            onChange={handleTitleChange}
          />
          <br />
          <h1 className="font-bold ">Enter Post Content</h1>
          <textarea
            className="textarea textarea-primary h-full mb-4 text-black"
            placeholder="Enter post text here"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <div className="card-actions justify-start">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCommunityPost;
