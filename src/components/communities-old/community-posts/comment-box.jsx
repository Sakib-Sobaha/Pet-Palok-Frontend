import React, { useEffect, useState } from "react";
import SingleComment from "./single-comment";

const CommentBox = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const url = `${process.env.NEXT_PUBLIC_BACK_END}/user/communities/post/getAllComments/${postId}`;
        const token = localStorage.getItem("token");
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "GET",
          headers: headers,
        };
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <SingleComment
              key={comment._id}
              userId={comment.commenter}
              text={comment.text}
              date={comment.date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
