import React, { useEffect, useState } from "react";
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate - birthDate;

  const ageDate = new Date(diffInMilliseconds); // Convert to date object for easier calculation
  const years = ageDate.getUTCFullYear() - 1970; // Get the difference in years
  const months = ageDate.getUTCMonth(); // Get the difference in months
  const days = ageDate.getUTCDate() - 1; // Get the difference in days

  if (years === 0 && months === 0) {
    return `${days} days`;
  }
  if (years === 0) {
    return `${months} months, ${days} days`;
  }
  return `${years} years, ${months} months, ${days} days`;
};

function AppointmentCompletedCard({ _appointmentRequest }) {
  const lenMax = 25;
  const [isExpanded, setIsExpanded] = useState(false);
  const [vet, setVet] = useState(null);
  const [pet, setPet] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointmentRequest, setAppointmentRequest] =
    useState(_appointmentRequest);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const handleDateChange = (e) => {
    setPreferredDate(e.target.value);
  };

  // Handle changes to the time input
  const handleTimeChange = (e) => {
    console.log("time changed");
    console.log(e.target.value);
    setPreferredTime(e.target.value);
  };

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const petUrl = `${process.env.REACT_APP_API_URL}/pets/${appointmentRequest.petId}`;
        const vetUrl = `${process.env.REACT_APP_API_URL}/vet/getVetById/${appointmentRequest.vetId}`;
        const userUrl = `${process.env.REACT_APP_API_URL}/user/getUserById/${appointmentRequest.userId}`;

        const petResponse = await fetch(petUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const vetResponse = await fetch(vetUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const userResponse = await fetch(userUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const petData = await petResponse.json();
        const vetData = await vetResponse.json();
        const userData = await userResponse.json();

        setPet(petData);
        setVet(vetData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    appointmentRequest.petId,
    appointmentRequest.vetId,
    appointmentRequest.userId,
  ]);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  const visitProfile = () => {
    window.location.href = `/user/pets/${pet?.id}`;
  };

  const handleStatusChange = (newStatus) => {
    setAppointmentRequest((prevReq) => ({
      ...prevReq,
      state: newStatus,
    }));
  };

  const getTimestamp = (date, time) => {
    if(!date || !time) {
      alert("Please select both date and time.");
      return null;
    }
    const [timeRange, period] = time.split(" ");
    const [startTime] = timeRange.split("-");
    const hour = parseInt(startTime, 10);
    const hour24 =
      period === "PM" && hour !== 12
        ? hour + 12
        : hour === 12 && period === "AM"
        ? 0
        : hour;
    const formattedHour = String(hour24).padStart(2, "0");

    // Construct the date string in the desired format
    const timestamp = new Date(`${date}T${formattedHour}:00:00.000Z`);

    // Get the formatted date in YYYY-MM-DDTHH:mm:ss.SSS+00:00 format
    const formattedTimestamp = timestamp.toISOString().replace("Z", "+00:00");
    console.log(formattedTimestamp);
    return formattedTimestamp;
  };

  const getButtonDetails = () => {
    // console.log(appointmentRequest.state);
    const token = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");

    if (userType === "vet") {
      switch (appointmentRequest.state?.toLowerCase()) {
        case "pending":
          return {
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            text: "Accept",
            onClick: async () => {

              // console.log("inside on click: ");
              // console.log(preferredDate, preferredTime);
              const timestamp = getTimestamp(preferredDate, preferredTime);
              if (!timestamp) {
                return;
              }

              // Check if the selected date and time are in the past
              const selectedDate = new Date(timestamp);
              const currentDate = new Date();

              if (selectedDate < currentDate) {
                alert(
                  "The selected date and time cannot be in the past. Please select a future date and time."
                );
                return;
              }
              // Prepare the request body
              const requestBody = {
                timestamp: timestamp,
              };
              handleStatusChange("WAITING_FOR_PAYMENT");

              try {
                await fetch(
                  `${process.env.REACT_APP_API_URL}/appointmentRequests/accept/${appointmentRequest.id}`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                  }
                );
              } catch (error) {
                console.error("Failed to accept appointment:", error);
              }
            },
          };
        case "waiting_for_payment":
          return {
            text: "Confirm Payment",
            svg: (
              <svg
                enable-background="new 0 0 48 48"
                height="48px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 48 48"
                width="48px"
                className="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  clip-rule="evenodd"
                  d="M47,40L47,40c0,2.762-2.238,5-5,5l0,0H6l0,0c-2.762,0-5-2.238-5-5V11  c0-2.209,1.791-4,4-4l0,0h20.171l8.099-2.934c0.513-0.187,1.081,0.078,1.268,0.589L35.391,7H39c2.209,0,4,1.791,4,4v2l0,0  c2.209,0,4,1.791,4,4V40z M5,9L5,9c-1.104,0-2,0.896-2,2s0.896,2,2,2h3.445l0,0h0.189c0.013-0.005,0.021-0.016,0.034-0.021L19.65,9  H5z M34.078,9.181l-1.062-2.924l-0.001,0v0L30.964,7h0.003l-5.514,2h-0.01l-11.039,4h21.062L34.078,9.181z M41,11  c0-1.104-0.896-2-2-2h-2.883l1.454,4H41l0,0V11z M43,15H5l0,0c-0.732,0-1.41-0.211-2-0.555V40c0,1.657,1.344,3,3,3h36  c1.657,0,3-1.343,3-3v-7h-4c-2.209,0-4-1.791-4-4s1.791-4,4-4h4v-8C45,15.896,44.104,15,43,15z M45,31v-4h-4c-1.104,0-2,0.896-2,2  s0.896,2,2,2H45z M41,28h2v2h-2V28z"
                  fill-rule="evenodd"
                />
              </svg>
            ),
            onClick: async () => {
              handleStatusChange("CONFIRMED");
              try {
                await fetch(
                  `${process.env.REACT_APP_API_URL}/appointmentRequests/confirmPayment/${appointmentRequest.id}`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
              } catch (error) {
                console.error("Failed to confirm payment:", error);
              }
            },
          };
        case "time_change_requested":
          return {
            text: "Reschedule",
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            onClick: async () => {

              const timestamp = getTimestamp(preferredDate, preferredTime);
              if (!timestamp) {
                return;
              }

              // Check if the selected date and time are in the past
              const selectedDate = new Date(timestamp);
              const currentDate = new Date();

              if (selectedDate < currentDate) {
                alert(
                  "The selected date and time cannot be in the past. Please select a future date and time."
                );
                return;
              }
              // Prepare the request body
              const requestBody = {
                timestamp: timestamp,
              };
              handleStatusChange("WAITING_FOR_PAYMENT");

              try {
                await fetch(
                  `${process.env.REACT_APP_API_URL}/appointmentRequests/accept/${appointmentRequest.id}`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                  }
                );
              } catch (error) {
                console.error("Failed to accept appointment:", error);
              }
            },
          };
        default:
          return null;
      }
    } else if (userType === "user") {
      switch (appointmentRequest.state?.toLowerCase()) {
        case "waiting_for_payment":
          return {
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            text: "Request Time Change",
            onClick: async () => {

              if (!preferredDate || !preferredTime) {
                console.log(preferredDate, "\n", preferredTime);
                alert("Please enter both date and time.");
                return;
              }

              // Generate the timestamp
              const timestamp = getTimestamp(preferredDate, preferredTime);

              if (!timestamp) {
                return;
              }

              // Check if the selected date and time are in the past
              const selectedDate = new Date(timestamp);
              const currentDate = new Date();

              if (selectedDate < currentDate) {
                alert(
                  "The selected date and time cannot be in the past. Please select a future date and time."
                );
                return;
              }

              // Prepare the request body
              const requestBody = {
                newTime: timestamp,
              };
              handleStatusChange("TIME_CHANGE_REQUESTED");

              try {
                await fetch(
                  `${process.env.REACT_APP_API_URL}/appointmentRequests/requestTimeChange/${appointmentRequest.id}`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                  }
                );
              } catch (error) {
                console.error("Failed to accept appointment:", error);
              }
            },
          };
      }
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        {/* <span className="loading loading-dots loading-lg text-content"> </span> */}
      </div>
    ); // You can replace this with a more sophisticated loader
  }

  return (
    <div className="card bg-base-100 w-full shadow-xl transition-transform duration-300 hover:shadow-lg indicator">
      <span className="indicator-item indicator-center badge badge-primary mt-2">
        {appointmentRequest?.state?.replaceAll("_", " ")}
      </span>

      <div className="card-body">
        <div>
          <h2
            className="card-title font-bold float-right text-accent cursor-pointer hover:scale-105 hover:text-primary"
            onClick={() => {
              window.location.href = `/vet/profile/${vet.id}`;
            }}
          >
            Vet: {vet?.firstname + " " + vet?.lastname}
          </h2>

          <h2
            className="card-title font-bold float-left cursor-pointer hover:scale-105 hover:text-primary"
            onClick={() => {
              window.location.href = `/user/profile/${user.id}`;
            }}
          >
            Applicant: {user?.firstname + " " + user?.lastname}
          </h2>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-accent float-right">
            Clinic: {vet?.clinic_name}
          </h2>

          <div className="float-left grid grid-cols-4 gap-2 justify-normal place-items-center text-base-content">
            <h1
              className="text-sm font-semibold cursor-pointer hover:scale-105 hover:text-primary"
              onClick={() => {
                window.location.href = `/user/pets/${pet.id}`;
              }}
            >
              <span className="font-bold">Pet Name: </span>
              {pet?.name}
            </h1>
            <h1 className="font-semibold">Type: {pet?.type}</h1>
            <h1 className="font-semibold">Breed: {pet?.breed}</h1>
            <h1 className="font-semibold">Age: {calculateAge(pet?.dob)}</h1>
          </div>
        </div>

        <div className="flex w-full text-info justify-between p-0">
          <p className="text-sm flex">
            <svg
              id="Icons"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current "
              strokeWidth="0.1"
            >
              <path
                class="cls-1"
                d="M20,2H19V1a1,1,0,0,0-2,0V2H7V1A1,1,0,0,0,5,1V2H4A4,4,0,0,0,0,6V20a4,4,0,0,0,4,4H20a4,4,0,0,0,4-4V6A4,4,0,0,0,20,2Zm2,18a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H5V5A1,1,0,0,0,7,5V4H17V5a1,1,0,0,0,2,0V4h1a2,2,0,0,1,2,2Z"
              />
              <path class="cls-1" d="M19,7H5A1,1,0,0,0,5,9H19a1,1,0,0,0,0-2Z" />
              <path class="cls-1" d="M7,12H5a1,1,0,0,0,0,2H7a1,1,0,0,0,0-2Z" />
              <path class="cls-1" d="M7,17H5a1,1,0,0,0,0,2H7a1,1,0,0,0,0-2Z" />
              <path
                class="cls-1"
                d="M13,12H11a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
              />
              <path
                class="cls-1"
                d="M13,17H11a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
              />
              <path
                class="cls-1"
                d="M19,12H17a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
              />
              <path
                class="cls-1"
                d="M19,17H17a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
              />
            </svg>
            <b className="ml-2 mt-1">
              Requested On:{" "}
              {new Date(appointmentRequest.timestamp).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC", // Forces UTC timezone
                }
              )}
            </b>
          </p>
          <p className="text-sm flex">
            <svg
              id="Icons"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current "
              strokeWidth="0.1"
            >
              <path
                class="cls-1"
                d="M20,2H19V1a1,1,0,0,0-2,0V2H7V1A1,1,0,0,0,5,1V2H4A4,4,0,0,0,0,6V20a4,4,0,0,0,4,4H20a4,4,0,0,0,4-4V6A4,4,0,0,0,20,2Zm2,18a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H5V5A1,1,0,0,0,7,5V4H17V5a1,1,0,0,0,2,0V4h1a2,2,0,0,1,2,2Z"
              />
              <path class="cls-1" d="M19,7H5A1,1,0,0,0,5,9H19a1,1,0,0,0,0-2Z" />
              <path class="cls-1" d="M7,12H5a1,1,0,0,0,0,2H7a1,1,0,0,0,0-2Z" />
              <path class="cls-1" d="M7,17H5a1,1,0,0,0,0,2H7a1,1,0,0,0,0-2Z" />
              <path
                class="cls-1"
                d="M13,12H11a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
              />
              <path
                class="cls-1"
                d="M13,17H11a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
              />
              <path
                class="cls-1"
                d="M19,12H17a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
              />
              <path
                class="cls-1"
                d="M19,17H17a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
              />
            </svg>
            <b className="ml-2 mt-1">
              Preferred Date:{" "}
              {new Date(appointmentRequest.bookingTime).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC", // Forces UTC timezone
                }
              )}
            </b>
          </p>
        </div>

        <div className="grid grid-cols-2">
          <p>
            <b className="">Medium: </b>{" "}
            {appointmentRequest.online ? "Online" : "In-Person"}
          </p>

          <div>
            <p>
              <p>
                <b>Preferred Time: </b>
                {new Date(appointmentRequest.bookingTime).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // Ensures 12-hour format with AM/PM
                    timeZone: "UTC", // Forces UTC timezone
                  }
                )}
              </p>
            </p>
          </div>
        </div>

        <p className="text-justify">
          <b>Description:</b>{" "}
          {isExpanded ||
          appointmentRequest.description.split(" ").length <= lenMax
            ? appointmentRequest.description
            : `${appointmentRequest.description
                .split(" ")
                .slice(0, lenMax)
                .join(" ")}...`}
          {appointmentRequest.description.split(" ").length > lenMax && (
            <button onClick={toggleDescription} className="text-primary">
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </p>

        {/* time input and date input */}

        {appointmentRequest.state === "PENDING" ||
        appointmentRequest.state === "TIME_CHANGE_REQUESTED" ||
        (appointmentRequest.state === "WAITING_FOR_PAYMENT" &&
          userType === "user") ? (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="label">
                <span className="label-text">Appointment Date</span>
              </label>
              <input
                type="date"
                id="preferredDateInput"
                className="input input-bordered w-full input-sm"
                value={preferredDate}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Appointment Time</span>
              </label>
              <select
                id="appointmentTime"
                className="input input-bordered w-full input-sm"
                value={preferredTime}
                onChange={handleTimeChange}
              >
                {Array.from({ length: 24 }).map((_, i) => {
                  const startHour = i;
                  const endHour = (i + 1) % 24;
                  const formatTime = (hour) =>
                    hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                  const period = i < 12 ? "AM" : "PM";

                  return (
                    <option
                      key={i}
                      value={`${formatTime(startHour)}:00-${formatTime(
                        endHour
                      )}:00 ${period}`}
                    >
                      {`${formatTime(startHour)}:00 ${period} - ${formatTime(
                        endHour
                      )}:00 ${period}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        ) : (
          <></>
        )}

        {appointmentRequest?.state === "REJECTED" ||
        appointmentRequest?.state === "CANCELLED" ||
        appointmentRequest?.state === "" ||
        !appointmentRequest?.state ? (
          <></>
        ) : (
          <div className="card-actions grid-cols-2 grid">
            {getButtonDetails() ? (
              <button
                className="btn btn-secondary rounded-lg"
                onClick={getButtonDetails().onClick}
              >
                {getButtonDetails().svg}
                {getButtonDetails().text}
              </button>
            ) : (
              <button className="btn btn-disabled rounded-lg">
                Unavailable
              </button>
            )}

            {appointmentRequest.state === "CONFIRMED" ? (
              // Disabled button when the appointment is confirmed
              <button className="btn btn-disabled rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Cancel Appointment
              </button>
            ) : userType === "vet" ? (
              // "Reject Appointment" button for vets
              <button
                className="btn btn-error rounded-lg"
                onClick={async () => {
                  const token1 = localStorage.getItem("authToken");
                  handleStatusChange("REJECTED");

                  try {
                    await fetch(
                      `${process.env.REACT_APP_API_URL}/appointmentRequests/reject/${appointmentRequest.id}`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token1}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                  } catch (error) {
                    console.error("Failed to reject appointment:", error);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Reject Appointment
              </button>
            ) : (
              // "Cancel Appointment" button for regular users
              <button
                className="btn btn-error rounded-lg"
                onClick={async () => {
                  const token1 = localStorage.getItem("authToken");
                  handleStatusChange("CANCELLED");

                  try {
                    await fetch(
                      `${process.env.REACT_APP_API_URL}/appointmentRequests/cancel/${appointmentRequest.id}`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token1}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                  } catch (error) {
                    console.error("Failed to cancel appointment:", error);
                  }
                }}
              >
                Cancel Appointment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentCompletedCard;
