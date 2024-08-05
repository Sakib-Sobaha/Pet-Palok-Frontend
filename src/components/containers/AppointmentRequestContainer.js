import React, { useState } from "react";
import ItemCard from "../cards/AppointmentRequest-card";

const appointmentRequests = [
  {
    id: 1,
    vetId: 2,
    userId: 4,
    petId: 1,
    request_date: "2022-10-10",
    booking_date: "2022-10-10",
    booking_time: "10:00",
    description:
      "Check up, the dog has been coughing. I tried to give him some medicine but it doesn't seem to work. At last, I decided to bring him to the vet.",
    status: "pending",
    medium: "offline",
  },
  {
    id: 2,
    vetId: 3,
    userId: 5,
    petId: 2,
    request_date: "2022-10-12",
    booking_date: "2022-10-15",
    booking_time: "14:30",
    description:
      "Annual check-up for the cat. No specific issues, just a routine visit.",
    status: "pending",
    medium: "online",
  },
  {
    id: 3,
    vetId: 1,
    userId: 6,
    petId: 3,
    request_date: "2022-10-18",
    booking_date: "2022-10-20",
    booking_time: "11:00",
    description:
      "Emergency visit for the dog. He got injured while playing and needs immediate attention.",
    status: "pending",
    medium: "offline",
  },
  {
    id: 4,
    vetId: 4,
    userId: 7,
    petId: 4,
    request_date: "2022-10-22",
    booking_date: "2022-10-25",
    booking_time: "16:45",
    description:
      "Follow-up appointment for the rabbit. Checking the progress after the previous treatment.",
    status: "pending",
    medium: "online",
  },
];

function AppointmentRequestContainer({ text }) {
  const [showAll, setShowAll] = useState(false);

  // Determine the number of items to show based on the state
  const itemsToShow = showAll ? appointmentRequests : appointmentRequests.slice(0, 6);

  return (
    <div className="bg bg-base-200 m-0 p-0 mb-4 rounded-xl">
      <h1 className="text-3xl font-bold ml-3">{text}</h1>
      <div className="grid grid-cols-1 gap-1 align-middle overflow-y-auto h-[60vh]">
        {itemsToShow.map((item, index) => (
          <ItemCard key={index} appointmentRequest={item} userType="seller" />
        ))}
      </div>
      {/* <div className="flex justify-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "See Less" : "See More"}
        </button>
      </div> */}
    </div>
  );
}

export default AppointmentRequestContainer;
