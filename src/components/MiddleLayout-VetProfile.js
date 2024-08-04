import { useState } from "react";
import React from "react";
import SectionDivider from "./Section-Divider";
import Timeline from "./Timeline";
import Rating from "./Rating";

import EditPasswordModal from "./modals/edit-password";
import EditProfileModal from "./modals/edit-profile-vet";
import BookAppointment from "./modals/book-appointment";

const timelineData = [
  {
    id: 1,
    date: "2017-01-01",
    event: "Was Born",
  },
  {
    id: 2,
    date: "2018-02-18",
    event: "Had Constipation",
  },
  {
    id: 3,
    date: "2020-03-17",
    event: "Haga problem",
  },
  {
    id: 4,
    date: "2023-04-01",
    event: "Shonay Somossha",
  },
  {
    id: 5,
    date: "2023-07-04",
    event: "Matha betha",
  },
];

const modal_name = "edit_profile_vet";

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

const images = [
  "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
  "https://www.bhmpics.com/downloads/beautiful-pictures-of-dogs/56.golden_puppy_dog_pictures.jpg",
  "https://static.toiimg.com/photo/109692764/109692764.jpg",
  "https://www.userbarn.com.au/userspot/app/uploads/2016/03/HYG9.2-Blog-Genral-In-Post-800x533px.png",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f94e3f42698_-_dog-stick-del-blog.jpg?crop=1xw:0.7309644670050761xh;center,top&resize=1200:*",
];

const MiddleLayoutVetProfile = ({ vet_ }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleabout = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-screen">
      <EditProfileModal element_id="edit_profile_vet" />
      <EditPasswordModal element_id="edit_password" />
      <BookAppointment element_id="book_appointment" vet={vet} />
      {/* Your content for MiddleLayout */}
      <SectionDivider title="Profile Details" icon="" />

      <div className="avatar float-right mb-5 mr-10 mt-2">
        <div className="ring-primary ring-offset-base-100 w-40 h-40 rounded-full aspect-square ring ring-offset-2">
          <img src={images[0]} />
        </div>
      </div>

      <h1 className="text-xl font-bold m-3">
        Name: <b className="text-4xl">{vet.firstname + " " + vet.lastname} </b>
      </h1>
      <div className="text-lg m-3 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">DOB:</span> {vet.DOB}
        </p>
        <p>
          <span className="font-bold">Gender:</span> {vet.gender}
        </p>

        {/* <p>
          <br />
        </p>
        <p> 
          <br />
        </p> */}
      </div>

      <h1 className="pl-3 font-bold text-xl">Contact Info:</h1>

      <div className="text-lg m-1 ml-3 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">Phone:</span> {vet.phone}
        </p>
        <p>
          <span className="font-bold">Email:</span> {vet.email}
        </p>
        <p>
          <span className="font-bold">Clinic Name:</span> {vet.clinic_name}
        </p>
        <p>
          <span className="font-bold">Clinic Address:</span>{" "}
          {vet.clinic_address}
        </p>
      </div>

      <h1 className="pl-3 font-bold text-xl">Address:</h1>

      <div className="text-lg ml-3 m-1 grid-cols-2 grid mb-5">
        <p>
          <span className="font-bold">Address:</span> {vet.address}
        </p>
        <p>
          <span className="font-bold">Post-Office:</span> {vet.postOffice}
        </p>
        <p>
          <span className="font-bold">District:</span> {vet.district}
        </p>
        <p>
          <span className="font-bold">Country:</span> {vet.country}
        </p>
      </div>

      <div className=" font-serif italic m-4">
        <b className="font-bold not-italic font-sans">About: {"   "}</b>
        {isExpanded || vet.about.split(" ").length <= 30
          ? vet.about
          : `${vet.about.split(" ").slice(0, 30).join(" ")}...`}
        {vet.about.split(" ").length > 30 && (
          <button onClick={toggleabout} className="text-blue-600 text-xs ml-0">
            {isExpanded ? " See Less" : " See More"}
          </button>
        )}
      </div>
      <div className="flex">
        <button
          className="btn btn-primary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
          onClick={() =>
            document.getElementById("edit_profile_vet").showModal()
          }
        >
          <svg
            class="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Edit Profile</span>
        </button>

        <button
          className="btn btn-accent mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
          onClick={() => document.getElementById("edit_password").showModal()}
        >
          <svg
            class="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Change Password</span>
        </button>

        <button className="btn btn-secondary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2">
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z" />
          </svg>
          <span>Send Message</span>
        </button>
        <button
          className="btn btn-secondary mt-3 m-1 h-8 rounded-md items-center gap-2 p-2"
          onClick={() => {
            document.getElementById("book_appointment").showModal();
          }}
        >
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
          <span>Book Appointment</span>
        </button>
      </div>
      <div className="grid  w-full place-items-center">
        <p>
          <span className=" font-bold">Vet's Rating:</span>
        </p>
        <Rating className="" rating={4.1} />
      </div>
    </div>
  );
};

export default MiddleLayoutVetProfile;
