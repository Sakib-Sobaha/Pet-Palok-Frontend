import React, { useState } from "react";
import { useFileUpload } from "../Supabase/image-uploader"; // Import the custom hook

const initialPost = {
  title: "",
  text: "",
  topics: [], // Selected topics
  images: [], // To store uploaded images' URLs
  anonymous: false, // Initial value for anonymous
};

const CreatePost = ({ element_id, _community }) => {
  const [community, setCommunity] = useState(_community);
  const [post, setPost] = useState(initialPost); // State for post details
  const [selectedImage, setSelectedImage] = useState(null); // State for image file
  const [newTopic, setNewTopic] = useState(""); // State for new topic input
  const { uploadFiles, uploading } = useFileUpload(); // Use the custom hook

  // Handler to update post properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  // Handle the anonymous select dropdown change
  const handleAnonymousChange = (e) => {
    setPost((prevPost) => ({
      ...prevPost,
      anonymous: e.target.value === "true", // Convert to boolean
    }));
  };

  // Handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // Handle checkbox change for community topics
  // Handle checkbox change for community topics
  const handleTopicSelection = (topic) => {
    const lowercaseTopic = topic.toLowerCase(); // Convert to lowercase
    setPost((prevPost) => {
      // If the topic is already selected, remove it; otherwise, add it
      const updatedTopics = prevPost.topics.includes(lowercaseTopic)
        ? prevPost.topics.filter((t) => t !== lowercaseTopic)
        : [...prevPost.topics, lowercaseTopic];

      return {
        ...prevPost,
        topics: updatedTopics,
      };
    });
  };

  // Handle new topic addition
  const handleAddNewTopic = () => {
    const lowercaseNewTopic = newTopic.trim().toLowerCase(); // Convert to lowercase
    if (lowercaseNewTopic && !post.topics.includes(lowercaseNewTopic)) {
      setPost((prevPost) => ({
        ...prevPost,
        topics: [...prevPost.topics, lowercaseNewTopic],
      }));
      setNewTopic(""); // Clear the input field after adding
    }
  };

  // Function to handle post creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = [];
      if (selectedImage) {
        // Upload the image and get the URL
        imageUrl = await uploadFiles([selectedImage]);
        console.log("Image URL:", imageUrl[0]);
      }

      // Create the post object to send
      const newPostData = {
        ...post,
        images: imageUrl.length > 0 ? imageUrl : [""], // Use the uploaded image URL or an empty string
        userType: localStorage.getItem("userType"), // Retrieve user type from localStorage
        communityId: community.id, // Use community id passed as a prop
      };

      console.log(newPostData);

      // Send the new post data to the server
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/communityPost/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newPostData),
        }
      );

      if (!response.ok) {
        throw new Error("Post creation failed.");
      }

      const result = await response.json();
      console.log("Post created:", result);
      alert("Post created successfully!");

      // Clear the form after successful submission
      setPost(initialPost);
      setSelectedImage(null);
      window.location.reload(); // Reload the page to see the new post
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Post</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Post Title */}
              <div>
                <label className="label">
                  <span className="label-text">Post Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Post Title"
                  required
                />
              </div>

              {/* Post Content */}
              <div>
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  name="text"
                  value={post.text}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Post content"
                  required
                />
              </div>

              {/* Topics Selection */}
              <div>
                <label className="label">
                  <span className="label-text">Select Topics</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {community?.topics?.map((topic, index) => (
                    <div key={index}>
                      <label className="cursor-pointer flex">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary mr-2"
                          checked={post.topics.includes(topic.toLowerCase())}
                          onChange={() => handleTopicSelection(topic.toLowerCase())}
                        />
                        <span className="mt-0.5">{topic}</span>
                      </label>
                    </div>
                  ))}
                </div>

                {/* New Topic Input */}
                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">Add New Topic</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter new topic"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleAddNewTopic}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Display Selected Topics */}
                {post.topics.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold">Selected Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.topics.map((topic, index) => (
                        <span key={index} className="badge badge-primary">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Anonymous Select */}
              <div>
                <label className="label">
                  <span className="label-text">Post as Anonymous?</span>
                </label>
                <select
                  name="anonymous"
                  value={post.anonymous ? "true" : "false"}
                  onChange={handleAnonymousChange}
                  className="select select-bordered w-full"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="label">
                  <span className="label-text">Image Upload</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="label mt-2">
                  <span className="label-text">Pick an image for the post</span>
                </div>

                {/* Image Preview */}
                {selectedImage && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded shadow"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={uploading}
              >
                {uploading ? "Creating..." : "Create Post"}
              </button>

              <form method="dialog">
                <button className="btn btn-error">Close</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreatePost;
