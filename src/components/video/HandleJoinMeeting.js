// handleJoinMeeting.js
export const HandleJoinMeeting = async () => {
    try {
      // Get the room ID from the input field
      const roomId = document.getElementById("meetingName").value;
  
      // Get the Bearer token from local storage
      const token = localStorage.getItem("authToken");
  
      // Construct the URL for the API request
      const url = `${process.env.REACT_APP_API_URL}/user/whoami`;
  
      // Make the API request with the Authorization header
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Parse the response data
      const data = await response.json();
  
      // Get the username from the fetched user data
      const username = data.firstname;
  
      // Construct the URL for the video call
      const videoCallUrl = `/VideoCall.html?roomID=${roomId}&username=${username}`;
  
      // Open the new meeting window
      window.open(videoCallUrl, "_blank");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  // Assuming this script runs after the DOM has loaded
  