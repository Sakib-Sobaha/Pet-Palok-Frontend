import React, { useState } from "react";

const petData = [
  {
    name: "Chokkor",
    age: 2,
    type: "Dog",
    gender: "Male",
    breed: "Labrador",
    description: "If a dog chews shoes whose shoes does he choose?",
    image: "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg",
  },
  {
    name: "Minu",
    age: 3,
    type: "Cat",
    gender: "Female",
    breed: "Siamese",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mikkiy",
    age: 1,
    type: "Bird",
    gender: "Male",
    breed: "Parrot",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://t3.ftcdn.net/jpg/00/95/29/28/360_F_95292880_GfqmxNb4u8ZxG18i2jkLt6gkAvl8xdz3.jpg",
  },
  {
    name: "Nimo",
    age: 1,
    type: "Fish",
    gender: "Female",
    breed: "Goldfish",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRHc-hn-wtBtKuCnyl_aQo3bp6Sqx8G2oIadx2-T3svIVieizMMDT-me2CBv8oksfsn",
  },
  {
    name: "Nantu",
    age: 1,
    type: "Rabbit",
    gender: "Male",
    breed: "Dwarf Rabbit",
    description: "If a dog chews shoes whose shoes does he choose?",
    image:
      "https://www.treehugger.com/thmb/Ocxi8FYaubDwjOwria6FNpGjJjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-953005498-4ca60c6c2c5f4b0e881b2746ad5f17ef.jpg",
  },
];

const vetData = {
  firstname: "Sakib",
  lastname: "Sobaha",
  email: "niloy870@gmail.com",
  phone: "01234123456",
  password: "pasword",
  clinic_name: "Bird Lovers Hospital",
  clinic_address: "Block-A, Road-1, Mirpur-10, Dhaka-1216, Bangladesh",
  address: "10/1, Monipur, Mirpur-2, Dhaka-1216",
  postOffice: "Mirpur-2",
  district: "Dhaka",
  country: "Bangladesh",
  DOB: "2020-01-01",
  gender: "male",
  image:
    "https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143871.jpg",
  about:
    "I am a worker for pets. Love working with them. Pets are our biggest friends. So we must take care of them! If we don't, who will?",
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

const BookAppointment = ({ element_id, vet }) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [visitType, setVisitType] = useState("offline");
  const [illnessDescription, setIllnessDescription] = useState("");

  const todayDate = new Date().toISOString().split("T")[0];

  // Handler to update selected pet
  const handlePetChange = (e) => {
    const petIndex = e.target.value;
    if (petIndex !== "") {
      setSelectedPet(petData[petIndex]);
    } else {
      setSelectedPet(null);
    }
  };

  // Handler to update visit type
  const handleVisitTypeChange = (e) => {
    setVisitType(e.target.value);
  };

  return (
    <div>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book an Appointment</h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Vet Information */}
            <div>
              <label className="label">
                <span className="label-text">Vet Name</span>
              </label>
              <input
                type="text"
                value={`${vetData.firstname} ${vetData.lastname}`}
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
                value={vetData.clinic_name}
                className="input input-bordered w-full"
                readOnly
              />
            </div>

            {/* User Information */}
            <div>
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                value={`${user.firstname} ${user.lastname}`}
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
            {selectedPet && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="label">
                    <span className="label-text">Pet Age</span>
                  </label>

                  <input
                    className="input input-bordered w-full"
                    value={selectedPet.age}
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Pet Type</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={selectedPet.type}
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Pet Breed</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={selectedPet.breed}
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Pet Gender</span>
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
          </div>

          {/* Appointment Time (Conditional Rendering) */}
          {/* {visitType === "online" && ( */}
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
          {/* )} */}

          <div className="modal-action">
            <button className="btn btn-accent">Book Appointment</button>

            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookAppointment;
