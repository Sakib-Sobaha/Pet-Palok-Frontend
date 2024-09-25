import React, { useEffect, useState } from "react";
import { HandleNewMeeting } from "../components/video/HandleMeeting";
import { HandleJoinMeeting } from "./video/HandleJoinMeeting";
import { useFileUpload } from "../components/Supabase/image-uploader";

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

function MiddleLayoutSingleAppointment({ _id }) {
  const lenMax = 50;
  const { uploadFiles } = useFileUpload();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vet, setVet] = useState(null);
  const [user, setUser] = useState(null);
  const [pet, setPet] = useState(null);
  const [meetingId, setMeetingId] = useState("");

  // State for prescription, medicines, and tests input
  const [prescription, setPrescription] = useState("");
  const [medications, setMedications] = useState([{ name: "", dosage: "" }]);
  const [tests, setTests] = useState([""]);
  const [prescriptionFile, setPrescriptionFile] = useState("");

  const authToken = localStorage.getItem("authToken");

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        // FileReader to read the file as a data URL (optional for local display)
        const reader = new FileReader();
        reader.readAsDataURL(file); // Optional: use if you want to display the file locally

        // Upload the file to Supabase (or wherever) and get the URL
        const urls = await uploadFiles([file]);

        if (urls && urls.length > 0) {
          const fileUrl = urls[0]; // Get the first file URL
          console.log("File uploaded to Supabase:", fileUrl);

          // Update prescriptionFile state
          setPrescriptionFile(fileUrl);

          // Immediately update the appointment object with the new prescription file URL
          setAppointment((prevState) => ({
            ...prevState,
            prescriptionFile: fileUrl, // Use fileUrl directly, do not rely on state yet
          }));

          console.log("Updated prescriptionFile URL:", fileUrl);

          // Show alert for successful upload
          alert("File uploaded successfully!");

          // Only call saveAppointment **after** file is uploaded and state is updated
          await saveAppointment(fileUrl); // Pass the file URL directly
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      // If no file is uploaded, still save other changes
      await saveAppointment(prescriptionFile); // Pass the current state value directly
    }
  };

  const removeFile = () => {
    // If you want to remove the file from the backend, handle that here
    setPrescriptionFile(""); // Reset prescriptionFile state
    setAppointment((prevState) => ({
      ...prevState,
      prescriptionFile: "", // Update appointment object as well
    }));
    alert("File removed successfully!");
  };
  const toggleDescription2 = () => {
    setIsExpanded2(!isExpanded2);
  };

  const sendLinkHandler = async () => {
    const url = `${process.env.REACT_APP_API_URL}/notifications/meetingStarted`;
    const headers = new Headers({
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    });
    const body = JSON.stringify({
      appointmentId: appointment.id,
      meetingLink: meetingId,
    });
    console.log(body);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      // Check if the response status is OK
      if (response.ok) {
        // Attempt to parse the response if it's not empty
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
          console.log(data); // Process JSON data
        } else {
          console.log("Non-JSON response or empty body");
        }

        alert("Meeting link sent successfully");
      } else {
        console.error(`Error: ${response.statusText}`);
        alert("Failed to send meeting link");
      }
    } catch (error) {
      console.error("Error sending meeting link:", error);
      alert("Error sending meeting link");
    }
  };

  // Save appointment and handle form submission
  const saveAppointment = async (fileUrl) => {
    const url = `${process.env.REACT_APP_API_URL}/appointments/update/${appointment.id}`;

    // Ensure medications are formatted as a map of strings
    const formattedMedications = medications.reduce((acc, med) => {
      if (med.name && med.dosage) {
        acc[med.name] = med.dosage;
      }
      return acc;
    }, {});

    // Prepare the appointment data
    const appointmentData = {
      prescription: prescription,
      medications: formattedMedications, // Should be a map
      tests: tests, // Already a list of strings
      prescriptionFile: fileUrl || prescriptionFile || null, // Use fileUrl directly or fallback to state
    };

    const headers = new Headers({
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    });

    console.log(JSON.stringify(appointmentData)); // For debugging

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(appointmentData), // Send JSON
      });

      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }

      const updatedAppointment = await response.json();
      setAppointment(updatedAppointment); // Update the state with the new appointment data
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/appointments/${_id}`;

    const fetchAppointment = async () => {
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      });
      setLoading(true);
      await fetch(url, {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          if (!response.ok) {
            const errorText = response.text();
            throw new Error(
              `Network response was not ok. Status: ${response.status}, ${errorText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setAppointment(data);
          setPrescription(data.prescription || "");
          setMedications(
            data.medications
              ? Object.entries(data.medications).map(([name, dosage]) => ({
                  name,
                  dosage,
                }))
              : [{ name: "", dosage: "" }]
          );
          setTests(data.tests || [""]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch appointment", error);
        });
    };

    fetchAppointment();
  }, [_id]);

  useEffect(() => {
    if (appointment) {
      const userUrl = `${process.env.REACT_APP_API_URL}/user/getUserById/${appointment.userId}`;
      const petUrl = `${process.env.REACT_APP_API_URL}/pets/${appointment.petId}`;
      const vetUrl = `${process.env.REACT_APP_API_URL}/vet/getVetById/${appointment.vetId}`;

      const fetchUser = async () => {
        const response = await fetch(userUrl, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUser(await response.json());
      };

      const fetchPet = async () => {
        const response = await fetch(petUrl, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setPet(await response.json());
      };

      const fetchVet = async () => {
        const response = await fetch(vetUrl, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setVet(await response.json());
      };

      fetchUser();
      fetchPet();
      fetchVet();
    }
  }, [appointment]);

  // Handlers for dynamic medication input
  const handleMedicationChange = (index, key, value) => {
    const newMedications = [...medications];
    newMedications[index][key] = value;
    setMedications(newMedications);
    saveAppointment(); // Add this to save the data when changed
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: "", dosage: "" }]);
  };

  const handleRemoveMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  // Handlers for dynamic tests input
  const handleTestChange = (index, value) => {
    const newTests = [...tests];
    newTests[index] = value;
    setTests(newTests);
    saveAppointment(); // Add this to save the data when changed
  };

  const handleAddTest = () => {
    setTests([...tests, ""]);
  };

  const handleRemoveTest = (index) => {
    const newTests = tests.filter((_, i) => i !== index);
    setTests(newTests);
  };

  const handlePrescriptionChange = (e) => {
    setPrescription(e.target.value);
    saveAppointment(); // Add this to save the data when changed
  };

  const handleOnClickNewMeeting = async () => {
    await HandleNewMeeting();
    const url = `${process.env.REACT_APP_API_URL}/notifications/meetingStarted/meetingId`;
  };

  if (loading) {
    return (
      <div>
        <span className="loading loading-dots"></span>
      </div>
    );
  }

  const isEditable = appointment?.state === "ONGOING";

  return (
    <div className="card bg-base-200 w-full shadow-xl duration-300 rounded-lg p-4 min-h-screen hover:shadow-lg">
      <div className="card-body">
        <div>
          <h2 className="card-title font-bold float-right text-accent">
            <h2
              className="card-title font-bold float-right text-accent cursor-pointer hover:scale-105 hover:text-primary"
              onClick={() => {
                window.location.href = `/vet/profile/${vet?.id}`;
              }}
            >
              Vet: {vet?.firstname + " " + vet?.lastname}
            </h2>{" "}
            <div
              className={`avatar ${vet?.status === "online" ? "online" : ""}`}
            >
              <div className="ring-primary ring-offset-base-100 ring ring-offset-2 w-10 rounded-full">
                <img src={vet?.image} />
              </div>
            </div>
          </h2>
          <h2 className="card-title font-bold float-left">
            <div
              className={`avatar ${user?.status === "online" ? "online" : ""}`}
            >
              <div className="ring-primary ring-offset-base-100 ring ring-offset-2 w-10 rounded-full">
                <img src={user?.image} />
              </div>
            </div>
            <h2
              className="card-title font-bold float-left cursor-pointer hover:scale-105 hover:text-primary"
              onClick={() => {
                window.location.href = `/user/profile/${user?.id}`;
              }}
            >
              Applicant: {user?.firstname + " " + user?.lastname}
            </h2>{" "}
          </h2>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-accent float-right">
            Clinic: {vet?.clinic_name}
          </h2>

          <div className="float-left grid grid-cols-5 gap-2 justify-normal place-items-center text-base-content">
            <div className="avatar">
              <div className="mask mask-circle w-20">
                <img src={pet?.images[0]} alt="" />
              </div>
            </div>

            <h1
              className="text-sm font-semibold cursor-pointer hover:scale-105 hover:text-primary"
              onClick={() => {
                window.location.href = `/user/pets/${pet?.id}`;
              }}
            >
              <span className="font-bold">Pet Name: </span>
              {pet?.name}
            </h1>
            <h1 className="font-semibold">Age: {calculateAge(pet?.dob)}</h1>
            <h1
              className="badge badge-warning font-semibold"
              style={{ padding: "0.5em 1em", lineHeight: "1.2" }}
            >
              {pet?.type}
            </h1>
            <h1
              className="font-semibold badge badge-info"
              style={{ padding: "0.5em 1em", lineHeight: "1.2" }}
            >
              {pet?.breed}
            </h1>
          </div>
        </div>

        <div className="flex w-full text-info justify-between p-0">
          <p className="text-sm grid grid-cols-2">
            <div className="flex">
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
                {new Date(appointment?.bookingTime).toLocaleDateString()}
              </b>
            </div>
            <div className="flex text-info">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-info fill-info"
              >
                <g data-name="Layer 15" id="Layer_15">
                  <path d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
                  <path d="M20.24,21.66l-4.95-4.95A1,1,0,0,1,15,16V8h2v7.59l4.66,4.65Z" />
                </g>
              </svg>
              <b className="ml-2 mt-1">
                Appointment Time:{" "}
                {new Date(appointment?.bookingTime).toLocaleTimeString()}
              </b>{" "}
            </div>
          </p>
          <p className="text-sm flex">
            <span className="badge badge-neutral">{appointment?.state}</span>
          </p>
        </div>

        <div className="flex">
          <p>
            <b className="">Medium: </b>{" "}
            {appointment?.medium ? "Online" : "In-Person"}
          </p>
          <div className="">
            <p className="text-justify text-content">
              <b>Description:</b>{" "}
              {isExpanded ||
              appointment?.description?.split(" ").length < lenMax
                ? appointment?.description
                : `${appointment?.description
                    ?.split(" ")
                    .slice(0, 50)
                    .join(" ")}...`}
              {appointment?.description?.split(" ").length > lenMax && (
                <button onClick={toggleDescription} className="text-primary ">
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </p>
          </div>
        </div>

        {/* {isEditable && appointment?.online && (
          <button className="btn btn-secondary w-32">Join Meeting</button>
        )} */}

        {/* Prescription */}
        <div>
          <b>Prescription: </b>
          <textarea
            className="textarea textarea-bordered w-full"
            value={prescription}
            onChange={handlePrescriptionChange}
            readOnly={
              !(isEditable && localStorage.getItem("userType") === "vet")
            }
          />
        </div>

        {/* Medications */}
        <div>
          <b>Medications:</b>
          {medications.map((medication, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Medicine Name"
                value={medication.name}
                onChange={(e) =>
                  handleMedicationChange(index, "name", e.target.value)
                }
                className="input input-bordered m-1"
                readOnly={!isEditable}
              />
              <input
                type="text"
                placeholder="Dosage"
                value={medication.dosage}
                onChange={(e) =>
                  handleMedicationChange(index, "dosage", e.target.value)
                }
                className="input input-bordered"
                readOnly={!isEditable}
              />
              {isEditable && localStorage.getItem("userType") === "vet" && (
                <button
                  className="btn btn-error"
                  onClick={() => handleRemoveMedication(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {isEditable && localStorage.getItem("userType") === "vet" && (
            <button className="btn btn-primary" onClick={handleAddMedication}>
              Add Medication
            </button>
          )}
        </div>

        {/* Tests */}
        <div>
          <b>Tests:</b>
          {tests.map((test, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Test"
                value={test}
                onChange={(e) => handleTestChange(index, e.target.value)}
                className="input input-bordered m-1"
                readOnly={!isEditable}
              />
              {isEditable && localStorage.getItem("userType") === "vet" && (
                <button
                  className="btn btn-error"
                  onClick={() => handleRemoveTest(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {isEditable && localStorage.getItem("userType") === "vet" && (
            <button className="btn btn-primary" onClick={handleAddTest}>
              Add Test
            </button>
          )}
        </div>

        {/* Prescription File */}
        {isEditable && localStorage.getItem("userType") === "vet" && (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Upload prescription file</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleFileChange} // Handle file upload
              disabled={!isEditable} // Disable if not editable
            />
            <div className="label">
              <span className="label-text-alt">pdf or image</span>
            </div>
            {prescriptionFile && localStorage.getItem("userType") === "vet" && (
              <div className="mt-2">
                <span className="text-sm">{prescriptionFile.name}</span>
                <button
                  className="btn btn-error btn-xs ml-4"
                  onClick={removeFile}
                >
                  Remove File
                </button>
              </div>
            )}
          </label>
        )}
      </div>
      {appointment?.prescriptionFile !== "" &&
        appointment?.prescriptionFile !== null && (
          <div>
            <button
              className="btn btn-primary flex w-56 ml-6 mb-1"
              onClick={() =>
                window.open(appointment?.prescriptionFile, "_blank")
              }
            >
              <svg
                class="feather feather-download"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Download Prescription
            </button>
          </div>
        )}

      {isEditable && (
        <>
          {localStorage.getItem("userType") === "vet" && (
            <div>
              <button
                id="newMeetingBtn"
                className="btn btn-primary w-56 mb-4 ml-6 mr-2"
                onClick={handleOnClickNewMeeting}
              >
                <svg
                  version="1.1"
                  viewBox="0 0 24 24"
                  // xml:space="preserve"
                  // xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  className="h-4 w-4"
                >
                  <g id="info" />
                  <g id="icons">
                    <path
                      d="M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1z M17,14h-3v3c0,1.1-0.9,2-2,2s-2-0.9-2-2v-3H7   c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2h3V7c0-1.1,0.9-2,2-2s2,0.9,2,2v3h3c1.1,0,2,0.9,2,2C19,13.1,18.1,14,17,14z"
                      id="add"
                    />
                  </g>
                </svg>
                Create a New Meeting
              </button>
              <br />

              <input
                type="text"
                placeholder="Meeting ID"
                id="meetingName"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="input input-bordered mr-2 ml-6"
              />
              <button className="btn btn-secondary" onClick={sendLinkHandler}>
                Send Link
              </button>
            </div>
          )}

          {localStorage.getItem("userType") === "user" && (
            <div className="join-meeting flex mb-4">
              <input
                type="text"
                placeholder="Meeting ID"
                id="meetingName"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="input input-bordered mr-2"
              />
              <button
                id="joinMeetingBtn"
                className="btn btn-secondary"
                onClick={HandleJoinMeeting}
              >
                Join
              </button>
            </div>
          )}
        </>
      )}
      <div></div>
    </div>
  );
}

export default MiddleLayoutSingleAppointment;
