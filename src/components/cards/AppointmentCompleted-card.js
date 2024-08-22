import React, { useState } from "react";

// import ReactToolTip from "../Tooltip/ReactToolTip";

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

function AppointmentRequestCard({ appointmentRequest }) {
  const lenMax = 25;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDescription2 = () => {
    setIsExpanded2(!isExpanded2);
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
            className="card-title font-bold float-left cursor-pointer hover:scale-105 hover:text-primary"
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
              className="text-sm font-semibold cursor-pointer hover:scale-105 hover:text-primary"
              onClick={() => {
                window.location.href = "/user/pets/:id";
              }}
            >
              <span className="font-bold">Pet Name: </span>
              {pet.name}
            </h1>
            <h1 className="font-semibold">Age: {pet.age}</h1>
            <h1 className="badge badge-warning font-semibold">{pet.type}</h1>
            <h1 className="font-semibold badge badge-info">{pet.breed}</h1>
          </div>
        </div>

        <div className="flex w-full text-info justify-between p-0">
          <p className="text-sm flex">
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 610.398 610.398"
              className="h-6 w-6 stroke-base-content"
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
            <b className="ml-2 mt-1">Requested On: {appointmentRequest.date}</b>
          </p>
          <p className="text-sm flex">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-base-content"
            >
              <g data-name="Layer 15" id="Layer_15">
                <path d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
                <path d="M20.24,21.66l-4.95-4.95A1,1,0,0,1,15,16V8h2v7.59l4.66,4.65Z" />
              </g>
            </svg>
            <b className="ml-2 mt-1">
              Appointment Time: {appointmentRequest.time}
            </b>
          </p>
        </div>

        <div className="flex ">
          <p>
            <b className="">Medium: </b> {appointmentRequest.medium}
          </p>

          {appointmentRequest.prescription !== null && (
            <button className="btn btn-primary btn-xs w-48">
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
          )}
          {appointmentRequest.prescription === null && (
            <button className="btn btn-error btn-xs w-48 flex">
              <svg
                enable-background="new 0 0 32 32"
                className="h-4 w-4"
                id="Editable-line"
                version="1.1"
                viewBox="0 0 32 32"
                // xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M23.995,13.089C23.996,13.059,24,13.03,24,13c0-4.418-3.582-8-8-8c-3.814,0-6.998,2.671-7.8,6.242C5.208,12.038,3,14.757,3,18 c0,3.866,3.134,7,7,7h13c3.314,0,6-2.686,6-6C29,16.026,26.834,13.564,23.995,13.089z"
                  fill="none"
                  id="XMLID_300_"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                />
                <line
                  fill="none"
                  id="XMLID_330_"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  x1="13"
                  x2="19"
                  y1="14"
                  y2="20"
                />
                <line
                  fill="none"
                  id="XMLID_329_"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  x1="13"
                  x2="19"
                  y1="20"
                  y2="14"
                />
              </svg>
              No Prescription Available
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <p className="text-justify text-base-content">
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
          </div>

          {/* <div className="divider divider-horizontal"></div> */}

          <p className="text-justify w-full text-warning">
            <b>Doctor's Words:</b>{" "}
            {isExpanded2 ||
            appointmentRequest.prescription_description.split(" ").length <=
              lenMax
              ? appointmentRequest.prescription_description
              : `${appointmentRequest.prescription_description
                  .split(" ")
                  .slice(0, lenMax)
                  .join(" ")}...`}
            {appointmentRequest.prescription_description.split(" ").length >
              lenMax && (
              <button onClick={toggleDescription2} className="text-primary ">
                {isExpanded2 ? "See Less" : "See More"}
              </button>
            )}
          </p>
        </div>

        {/* <div className="place-items-center grid"> */}
        <div
          className="tooltip"
          data-tip={`${appointmentRequest.medicines
            .map((medicine) => `${medicine.name} - ${medicine.dosage}`)
            .join(",\n")}`}
        >
          <button className="btn-sm btn">Medicines List</button>
        </div>

        <div
          className="tooltip tooltip-bottom "
          data-tip={`${appointmentRequest.tests
            .map((test) => `${test}`)
            .join(",\n")}`}
        >
          <button className="btn-sm btn">Tests</button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentRequestCard;
