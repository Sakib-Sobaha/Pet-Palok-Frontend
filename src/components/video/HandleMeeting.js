// HandleNewMeeting.js
export const HandleNewMeeting = async () => {
    const userType = localStorage.getItem("userType");
    try {
      
      // Construct the URL for the API request
      const url = `${process.env.REACT_APP_API_URL}/${userType}/whoami`;
  
      // Get the Bearer token from local storage
      const token = localStorage.getItem("authToken");
  
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
  
      // Open the new meeting window with the username
      window.open(`/VideoCall.html?username=${data.firstname}`, "_blank");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  