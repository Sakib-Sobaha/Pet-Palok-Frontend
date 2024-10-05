import { useEffect, useState } from "react";
import React from "react";

const timeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInMs = now - then;

  // Convert milliseconds to minutes, hours, and days
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days > 0) {
    return `${days} d ${remainingHours} h ago`;
  } else if (hours > 0) {
    return `${hours} h ${minutes} m ago`;
  } else {
    return `${minutes} m ago`;
  }
};

const fetchData = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

function CommunityPost({ _post }) {
  const [post, setPost] = useState(_post);
  const [author, setAuthor] = useState(null);
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    let url = "";

    if (post.userType === "user") {
      url = `${process.env.REACT_APP_API_URL}/user/getUserById/${post.author}`;
    } else if (post.userType === "vet") {
      url = `${process.env.REACT_APP_API_URL}/vet/getVetById/${post.author}`;
    } else if (post.userType === "seller") {
      url = `${process.env.REACT_APP_API_URL}/admin/getAdminById/${post.author}`;
    }

    fetchData(url, token)
      .then((data) => {
        setAuthor(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [post]);

  const handleReact = async () => {
    const token = localStorage.getItem("authToken");
    const url = post.reactList.includes(visitor.id)
      ? `${process.env.REACT_APP_API_URL}/communityPost/removeReact/${post.id}`
      : `${process.env.REACT_APP_API_URL}/communityPost/react/${post.id}`;

    const method = post.reactList.includes(visitor.id) ? "POST" : "POST";
    const reactBody = { userType };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reactBody),
      });
      const updatedPost = await response.json();
      setPost(updatedPost);
    } catch (error) {
      console.error("Error updating react:", error);
    }
  };

  if (loading)
    return (
      <div>
        <div className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    );
  else
    return (
      <div className="m-1 my-4">
        <div className="card lg:card-side bg-base-100 shadow-xl rounded-b">
          {post?.images?.length > 0 && post?.images[0] ? (
            <img
              src={post?.images[0]}
              alt="Album"
              className="w-1/2 aspect-square object-contain bg-primary bg-opacity-30"
            />
          ) : null}

          <div className="card-body">
            <div className="flex gap-3">
              <div className="avatar">
                {post?.anonymous ? (
                  <div
                    className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2 hover:cursor-pointer hover:scale-105"
                    onClick={() => {
                      // window.location.href = `/${post?.userType}/profile/${author?.id}`;
                    }}
                  >
                    <img
                      src={
                        "https://www.pngitem.com/pimgs/m/302-3023907_business-man-png-logo-transparent-png.png"
                      }
                    />
                  </div>
                ) : (
                  <div
                    className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2 hover:cursor-pointer hover:scale-105"
                    onClick={() => {
                      window.location.href = `/${post?.userType}/profile/${author?.id}`;
                    }}
                  >
                    <img src={author?.image} />
                  </div>
                )}
              </div>

              {post?.anonymous ? (
                <div className="mt-1">
                  <h2
                    className="font-semibold hover:text-secondary cursor-pointer"
                    onClick={() => {
                      // window.location.href = `/${post?.userType}/profile/${author?.id}`;
                    }}
                  >
                    Anonymous Member
                  </h2>
                </div>
              ) : (
                <div className="mt-1">
                  <h2
                    className="font-semibold hover:text-primary cursor-pointer hover:scale-105"
                    onClick={() => {
                      window.location.href = `/${post?.userType}/profile/${author?.id}`;
                    }}
                  >
                    {post?.userType === "seller"
                      ? author?.name
                      : `${author?.firstname} ${author?.lastname}`}
                  </h2>
                </div>
              )}
            </div>

            <div className="float-right">
              <h1 className="text-xs text-info flex">
                <svg
                  viewBox="0 0 32 32"
                  className="mr-2 fill-current text-content h-4 w-4 mt-1 stroke-current"
                  strokeWidth="1.5"
                >
                  <g data-name="Layer 15" id="Layer_15">
                    <path d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
                    <path d="M20.24,21.66l-4.95-4.95A1,1,0,0,1,15,16V8h2v7.59l4.66,4.65Z" />
                  </g>
                </svg>
                <span className="mt-1">{timeAgo(post.timestamp)}</span>
              </h1>
            </div>

            <h2 className="card-title text-2xl">{post?.title}</h2>
            <p>{post?.text}</p>

            <div>
              {post?.topics.map((topic) => (
                <span
                  key={topic}
                  className="badge badge-outline badge-primary mr-2"
                >
                  #{topic}
                </span>
              ))}
            </div>

            <div className="card-actions justify-end">
              <button
                className={`btn ${
                  post.reactList.includes(visitor?.id)
                    ? "btn-primary"
                    : "btn-ghost border-primary fill-current border-opacity-20"
                }`}
                onClick={handleReact}
              >
                <svg
                  enable-background="new 0 0 32 32"
                  height="32px"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 32 32"
                  width="32px"
                  //   xml:space="preserve"
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   xmlns:xlink="http://www.w3.org/1999/xlink"
                  className="fill-content text-primary h-6 w-6"
                >
                  <g>
                    <polyline
                      fill="none"
                      points="   649,137.999 675,137.999 675,155.999 661,155.999  "
                      stroke="#FFFFFF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                    />
                    <polyline
                      fill="none"
                      points="   653,155.999 649,155.999 649,141.999  "
                      stroke="#FFFFFF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                    />
                    <polyline
                      fill="none"
                      points="   661,156 653,162 653,156  "
                      stroke="#FFFFFF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                    />
                  </g>
                  <g>
                    <g>
                      <path d="M16,30c-0.215,0-0.43-0.069-0.61-0.207C14.844,29.372,2,19.396,2,11c0-4.411,3.589-8,8-8s8,3.589,8,8c0,0.552-0.447,1-1,1    c-0.552,0-1-0.448-1-1c0-3.309-2.691-6-6-6s-6,2.691-6,6c0,6.467,9.477,14.653,12,16.719C18.522,25.653,28,17.46,28,11    c0-3.309-2.691-6-6-6c-0.895,0-1.756,0.192-2.559,0.57c-0.5,0.236-1.097,0.021-1.331-0.478c-0.235-0.5-0.021-1.095,0.478-1.331    C19.66,3.256,20.808,3,22,3c4.411,0,8,3.589,8,8c0,8.396-12.844,18.372-13.39,18.793C16.43,29.931,16.215,30,16,30z" />
                    </g>
                  </g>
                </svg>
                {` ${post.reactList.length}`}
              </button>
            </div>
          </div>
        </div>
        <details className="collapse bg-base-100 rounded-t">
          <summary className="collapse-title text-xl font-medium">
            No Comments Yet
          </summary>
          <div className="collapse-content">
            <div className="flex gap-3">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text ml-2">Anonymous</span>
                </label>
              </div>{" "}
              <input
                type="text"
                placeholder="Write Comment Here"
                className="input input-bordered input-primary w-full max-w-xs"
              />
              <button className="btn btn-primary">Comment</button>
            </div>
            <p>content</p>
          </div>
        </details>
      </div>
    );
}

export default CommunityPost;
