import React from "react";
import CommentBox from "./comment-box";

import { useState, useEffect } from "react";

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

const CommunityPostCardFeed = ({ post }) => {
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACK_END}/user/communities/post/comment/${post._id}`;
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ comment: newComment }),
      };
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await response.json();
      // Optionally, update the UI to display the newly added comment
      // You can append the new comment to the existing comments list
      console.log("New comment added:", data);

      setNewComment("Write a comment ...");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACK_END}/user/getUser/${post.author}`;
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

  return (
    <div>
      <div className="card w-full mb-4 bg-base-100 shadow-xl border border-neutral">
        <div className="card-body">
          {/* <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Avatar"
              />
            </div>
          </div> */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 20 20"
              id="profile"
              className="mr-5 mb-1 mt-1 ml-1"
              stroke="currentColor"
            >
              <g fill="none" fill-rule="evenodd">
                <g fill="#000" transform="translate(-140 -2159)">
                  <g transform="translate(56 160)">
                    <path d="M100.563 2017H87.438c-.706 0-1.228-.697-.961-1.338 1.236-2.964 4.14-4.662 7.523-4.662 3.384 0 6.288 1.698 7.524 4.662.267.641-.255 1.338-.961 1.338m-10.646-12c0-2.206 1.832-4 4.083-4 2.252 0 4.083 1.794 4.083 4s-1.831 4-4.083 4c-2.251 0-4.083-1.794-4.083-4m14.039 11.636c-.742-3.359-3.064-5.838-6.119-6.963 1.619-1.277 2.563-3.342 2.216-5.603-.402-2.623-2.63-4.722-5.318-5.028-3.712-.423-6.86 2.407-6.86 5.958 0 1.89.894 3.574 2.289 4.673-3.057 1.125-5.377 3.604-6.12 6.963-.27 1.221.735 2.364 2.01 2.364h15.892c1.276 0 2.28-1.143 2.01-2.364"></path>
                  </g>
                </g>
              </g>
            </svg>
            <div>
              <h2 className="">
                Author:
                <h1 className="text-xl font-bold text-primary">
                  {author && author.name}
                </h1>
              </h2>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  id="clock"
                  width="20"
                  height="20"
                  stroke="white"
                  className="mr-2"
                >
                  <path d="M12,6a.99974.99974,0,0,0-1,1v4.38379L8.56934,12.60693a.99968.99968,0,1,0,.89843,1.78614l2.98145-1.5A.99874.99874,0,0,0,13,12V7A.99974.99974,0,0,0,12,6Zm0-4A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"></path>
                </svg>
                <p>{calculateTimeDifference(post.date)}</p>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <h2 className="card-title">{post.title}</h2>
          <p>{post.content}</p>

          <div className="divider"></div>

          <details className="collapse bg-base-200">
            <summary className="collapse-title text-xl font-medium">
              <div className="text-primary justify-start">
                {post.comments.length}{" "}
                {post.comments.length !== 1 ? "comments" : "comment"}{" "}
                {/* Conditional rendering based on the number of comments */}
              </div>
            </summary>
            <div className="collapse-content">
              {post.comments.length == 0 && "No comments yet"}
              {post.comments.length > 0 && <CommentBox postId={post._id} />}
            </div>
          </details>

          <div>
            <textarea
              className="textarea textarea-primary w-3/5 m-2 h-12"
              placeholder="Write a comment..."
              value={newComment}
              onChange={handleCommentChange}
            ></textarea>
            <button
              className="btn btn-primary w-1/5 align-top m-2 h-12"
              onClick={handleCommentSubmit}
            >
              Comment
            </button>
            {/* <button className="btn btn-primary w-1/6 align-top m-2 h-12">
              View Details
            </button> */}
          </div>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCardFeed;
