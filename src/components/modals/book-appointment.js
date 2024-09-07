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

const fetchPetData = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/pets/myPets`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(
        `Network response was not ok. Status: ${response.status}, ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch pets:", error);
    return []; // Return an empty array in case of an error
  }
};

const fetchUserAPI = async (token) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/user/whoami`;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok. Status: ${response.status}, ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

const BookAppointment = ({ element_id, _vet }) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [visitType, setVisitType] = useState("offline");
  const [illnessDescription, setIllnessDescription] = useState("");
  const [loading, setLoading] = useState(true); // State to handle loading
  const [petData, setPetData] = useState([]);
  const [vet, setVet] = useState(_vet);
  const [user, setUser] = useState(null);

  const fetchPets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchPetData(token);
      setPetData(data);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchUserAPI(token);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePetChange = (e) => {
    const petIndex = e.target.value;
    if (petIndex !== "") {
      setSelectedPet(petData[petIndex]);
    } else {
      setSelectedPet(null);
    }
  };

  const handleVisitTypeChange = (e) => {
    setVisitType(e.target.value);
  };

  const handleBookAppointment = async () => {
    if (
      !selectedPet ||
      !appointmentDate ||
      !appointmentTime ||
      !illnessDescription
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found in local storage.");
      return;
    }

    const bookingTime = `${appointmentDate}T${appointmentTime}:00.000+00:00`;

    const requestBody = {
      vetId: vet?.id,
      petId: selectedPet?.id,
      online: visitType === "online",
      bookingTime: bookingTime,
      description: illnessDescription,
    };

    try {
      const url = `${process.env.REACT_APP_API_URL}/appointmentRequests/create`;
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      };

      setLoading(true);
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok. Status: ${response.status}, ${errorText}`
        );
      }

      const data = await response.json();
      alert("Appointment booked successfully!");
      setLoading(false);
      window.location.reload();
      // Optionally close the modal here or reset the form
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book an Appointment</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Vet Name</span>
              </label>
              <input
                type="text"
                value={`${_vet?.firstname} ${_vet?.lastname}`}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Clinic Name</span>
              </label>
              <input
                type="text"
                value={vet?.clinic_name}
                className="input input-bordered w-full"
                readOnly
              />
            </div>

            {/* Pet Selection */}
            <div>
              <label className="label">
                <span className="label-text">Select Pet</span>
              </label>
              <select
                className="select select-bordered w-full"
                onChange={handlePetChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Pet
                </option>
                {petData.map((pet, index) => (
                  <option key={index} value={index}>
                    {pet.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pet Details */}
            <h1 className="text-xl font-bold mb-0">Pet Details</h1>
            {selectedPet && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={calculateAge(selectedPet.dob)}
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Type</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={selectedPet.type}
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Breed</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={selectedPet.breed}
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={selectedPet.gender}
                    readOnly
                  />
                </div>
              </div>
            )}

            {/* Illness Description */}
            <div>
              <label className="label">
                <span className="label-text">Description of Illness</span>
              </label>
              <textarea
                name="illnessDescription"
                value={illnessDescription}
                onChange={(e) => setIllnessDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Describe the illness or sickness"
              />
            </div>

            {/* Appointment Date */}
            <div>
              <label className="label">
                <span className="label-text">Today's Date</span>
              </label>
              <input
                type="date"
                value={todayDate}
                className="input input-bordered w-full"
                readOnly
              />
            </div>

            {/* Visit Type */}
            <div>
              <label className="label">
                <span className="label-text">Visit Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={visitType}
                onChange={handleVisitTypeChange}
              >
                <option value="" disabled>
                  Select Appointment Type
                </option>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </div>

            {/* Appointment Date */}
            <div>
              <label className="label">
                <span className="label-text">Appointment Date</span>
              </label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            {/* Appointment Time */}
            <div>
              <label className="label">
                <span className="label-text">Appointment Time</span>
              </label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="modal-action">
            <button className="btn btn-accent" onClick={handleBookAppointment} disabled={loading}>
              {loading ? "Booking Appointment..." : "Book Appointment"}
            </button>

            <form method="dialog">
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookAppointment;
