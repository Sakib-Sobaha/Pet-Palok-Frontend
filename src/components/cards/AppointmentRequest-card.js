
import React from "react";
import { useEffect, useState } from "react";

const pet = {
  name: "Chokkor",
  age: new Date().getFullYear() - new Date("2020-01-01").getFullYear(),
  type: "Animal",
  breed: "Dog",
  DOB: "2020-01-01",
  gender: "male",
  description:
    "Chokkor is a cute dog! He is a very good friend! I pass most of my time with him. Soo friendly. My beloved! Doggy doggy doggy dogyy. Cutie pie amar. I love him too too too too much",
};

// const fetchPetData = async (token, petId) => {
//   try {
//     const url = `http://localhost:8080/api/v1/pets/${petId}`;
//     const headers = new Headers({
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     });

//     const requestOptions = {
//       method: "GET",
//       headers: headers,
//     };

//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       const errorText = await response.json();
//       throw new Error(
//         `Network response was not ok. Status: ${response.status}, ${errorText}`
//       );
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch the pet:", error);
//     return null; // Return null in case of an error
//   }
// };

const vet = {
  firstname: "Sakib",
  lastname: "Sobaha",

  email: "niloy870@gmail.com",
  phone: "01234123456",

  password: "pasword",

  clinic_name: "Bird Lovers Hostpital",
  clinic_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",

  address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
  postOffice: "Mirpur-2",
  district: "Dhaka",
  country: "Bangladesh",

  DOB: "2020-01-01",
  gender: "male",

  about:
    "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care for them! If we dont, who will?",

  rating_vetvisit: "4",
};


// const fetchVetData = async (token, vetId) => {
//   try {
//     const url = `http://localhost:8080/api/v1/vet/getVetById/${vetId}`;
//     const headers = new Headers({
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     });

//     const requestOptions = {
//       method: "GET",
//       headers: headers,
//     };

//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       const errorText = await response.json();
//       throw new Error(
//         `Network response was not ok. Status: ${response.status}, ${errorText}`
//       );
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch the pet:", error);
//     return null; // Return null in case of an error
//   }
// };

const user = {
  firstname: "Niloy",
  lastname: "Faiaz",
  email: "niloy870@gmail.com",
  phone: "01234123456",
  password: "pasword",
  address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
  postOffice: "Mirpur-2",
  district: "Dhaka",
  country: "Bangladesh",
  DOB: "2020-01-01",
  gender: "male",
  about:
    "Chokkor is a cute dog! He is a very good friend! I pass most of my time with him. Soo friendly. My beloved! Doggy doggy doggy dogyy. Cutie pie amar. I love him too too too too much",
  rating_buysellexch: "4",
  rating_petkeeping: "5",
  rating_vet: "3",
};

function AppointmentCompletedCard({ appointmentRequest, petId, vetId, userId }) {
  const lenMax = 25;
  const [isExpanded, setIsExpanded] = useState(false);
  // const[vet, setVet] = useState(null);
  // const [pet, setPet] = useState(null);
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading



  // const fetchPet = async () => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     console.error("No auth token found in local storage.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const data = await fetchPetData(token, petId);
  //     setPet(data);
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   } finally {
  //     setLoading(false); // Ensure loading is set to false after fetching
  //   }
  // };

  // useEffect(() => {
  //   fetchPet();
  // }, [petId]);

  // const fetchVet = async () => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     console.error("No auth token found in local storage.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const data = await fetchVetData(token, vetId);
  //     setVet(data);
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   } finally {
  //     setLoading(false); // Ensure loading is set to false after fetching
  //   }
  // };

  // useEffect(() => {
  //   fetchVet();
  // }, [vetId]);


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // Construct the URL for the API request
  //       const url = `${process.env.REACT_APP_API_URL}/user/getUserById/${userId}`;
  //       console.log(url);
  //       console.log(userId);

  //       // Get the Bearer token from local storage (or wherever you store it)
  //       const token = localStorage.getItem("authToken");

  //       // Make the API request with the Authorization header
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       // Parse the response data
  //       const data = await response.json();

  //       // Update the state with the fetched data
  //       setUser(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   // Fetch user data when the component mounts or userId changes
  //   fetchUserData();
  // }, [userId]);


  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const visitProfile = () => {
    window.location.href = `/user/pets/${pet.id}`;
  };

  return (
    <div className="card bg-base-100 w-full shadow-xl transition-transform duration-300 hover:shadow-lg">
      <div className="card-body">
        <div>
          <h2
            className="card-title font-bold float-right text-accent cursor-pointer hover:scale-105 hover:text-primary"
            onClick={() => {
              window.location.href = "/vet/profile/:vetid";
            }}
          >
            Vet: {vet.firstname + " " + vet.lastname}
          </h2>

          <h2
            className="card-title font-bold float-left  cursor-pointer hover:scale-105 hover:text-primary"
            onClick={() => {
              window.location.href = "/user/profile/:vetid";
            }}
          >
            Applicant: {user.firstname + " " + user.lastname}
          </h2>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-accent float-right">
            Clinic: {vet.clinic_name}
          </h2>

          <div className="float-left grid grid-cols-4 gap-2 justify-normal place-items-center text-base-content">
            <h1
              className="text-sm font-semibold  cursor-pointer hover:scale-105 hover:text-primary"
              onClick={() => {
                window.location.href = "/user/pets/:id";
              }}
            >
              {" "}
              <span className=" font-bold">Pet Name: </span>
              {pet.name}
            </h1>
            <h1 className=" font-semibold">Type: {pet.type}</h1>

            <h1 className="font-semibold">Breed: {pet.breed}</h1>

            <h1 className=" font-semibold">Age: {pet.age}</h1>
          </div>
        </div>

        <div className="flex w-full text-info justify-between p-0">
          <p className="text-sm flex">
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 610.398 610.398"
              // xml:space="preserve"
              className="h-6 w-6"
            >
              <g>
                <g>
                  <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052 c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553 V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"></path>
                  <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992 h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"></path>
                  <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117 V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818 c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764 V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"></path>
                  <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"></path>
                  <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017 c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"></path>
                  <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"></path>
                  <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"></path>
                  <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"></path>
                  <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032 c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"></path>
                  <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"></path>
                  <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"></path>
                </g>
              </g>
            </svg>
            <b className="ml-2 mt-1">
              Requested On: {appointmentRequest.request_date}
            </b>
          </p>
          <p className="text-sm flex">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 610.398 610.398"
              // xml:space="preserve"
              className="h-6 w-6 fill-primary-content"
            >
              <g>
                <g>
                  <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052 c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553 V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"></path>
                  <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992 h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"></path>
                  <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117 V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818 c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764 V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"></path>
                  <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"></path>
                  <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017 c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"></path>
                  <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"></path>
                  <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"></path>
                  <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"></path>
                  <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032 c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"></path>
                  <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"></path>
                  <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"></path>
                </g>
              </g>
            </svg>
            <b className="ml-2 mt-1">
              Preferred Date: {appointmentRequest.booking_date}
            </b>
          </p>
        </div>

        <div className="grid grid-cols-2">
          <p>
            <b className="">Medium: </b> {appointmentRequest.medium}
          </p>

          {appointmentRequest.medium === "online" && (
            <div>
              <p>
                <b>Preferred Time: </b>
                {appointmentRequest.booking_time}
              </p>
            </div>
          )}
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
            <button onClick={toggleDescription} className="text-primary ">
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </p>

        <div className="grid grid-cols-2 gap-2">
          {/* Appointment Date */}
          <div>
            <label className="label">
              <span className="label-text">Appointment Date</span>
            </label>
            <input
              type="date"
              // value={appointmentDate}
              // onChange={(e) => setAppointmentDate(e.target.value)}
              className="input input-bordered w-full input-sm"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Appointment Time</span>
            </label>
            <input
              type="time"
              // value={appointmentTime}
              // onChange={(e) => setAppointmentTime(e.target.value)}
              className="input input-bordered w-full input-sm"
            />
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
