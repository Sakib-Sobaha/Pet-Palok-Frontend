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
function AppointmentCompletedCard({ appointmentRequest }) {
  const lenMax = 25;
  const [isExpanded, setIsExpanded] = useState(false);
  const [vet, setVet] = useState(null);
  const [pet, setPet] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <span className="indicator-item indicator-center badge badge-primary mt-2">{appointmentRequest.state.replaceAll("_"," ")}</span>

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
                <path
                  class="cls-1"
                  d="M19,7H5A1,1,0,0,0,5,9H19a1,1,0,0,0,0-2Z"
                />
                <path
                  class="cls-1"
                  d="M7,12H5a1,1,0,0,0,0,2H7a1,1,0,0,0,0-2Z"
                />
                <path
                  class="cls-1"
                  d="M7,17H5a1,1,0,0,0,0,2H7a1,1,0,0,0,0-2Z"
                />
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
                  { year: "numeric", month: "long", day: "numeric" }
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
                <path
                  class="cls-1"
                  d="M19,7H5A1,1,0,0,0,5,9H19a1,1,0,0,0,0-2Z"
                />
                <path
                  class="cls-1"
                  d="M7,12H5a1,1,0,0,0,0,2H7a1,1,0,0,0,0-2Z"
                />
                <path
                  class="cls-1"
                  d="M7,17H5a1,1,0,0,0,0,2H7a1,1,0,0,0,0-2Z"
                />
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
                  undefined,
                  { year: "numeric", month: "long", day: "numeric" }
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
                    undefined,
                    { hour: "2-digit", minute: "2-digit" }
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

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="label">
                <span className="label-text">Appointment Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full input-sm"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Appointment Time</span>
              </label>
              <select className="input input-bordered w-full input-sm">
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

          <div className="card-actions grid-cols-2 grid">
            <button
              className="btn btn-secondary rounded-lg"
              onClick={visitProfile}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Accept Appointment
            </button>
            <button className="btn btn-error rounded-lg">
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
          </div>
        </div>
      </div>
  );
}

export default AppointmentCompletedCard;
