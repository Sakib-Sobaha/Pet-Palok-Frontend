import React, { useState } from "react";
import AppointmentCompleted from "../cards/AppointmentCompleted-card";

const appointmentRequests = [
    {
      id: 1,
      vetId: 2,
      userId: 4,
      petId: 1,
      date: "2022-10-10",
      time: "10:00",
      description:
        "Check up, the dog has been coughing. I tried to give him some medicine but it doesn't seem to work. At last, I decided to bring him to the vet.",
      status: "pending",
      medium: "offline",
      prescription_description: "Prescription provided in the link below",
      prescription: "https://example.com/prescription1.pdf", // URL to prescription PDF or description text
      medicines: [
        { name: "Cough Syrup", dosage: "5 ml twice a day" },
        { name: "Anti-inflammatory", dosage: "1 tablet daily" }
      ],
      tests: ["Chest X-ray", "Blood Test"]
    },
    {
      id: 2,
      vetId: 3,
      userId: 5,
      petId: 2,
      date: "2022-10-15",
      time: "14:30",
      description:
        "Annual check-up for the cat. No specific issues, just a routine visit.",
      status: "pending",
      medium: "online",
      prescription_description: "Prescription provided in the link below",

      prescription: null, // Example text for cases without a PDF
      medicines: [
        { name: "Flea Prevention", dosage: "1 tablet monthly" }
      ],
      tests: ["Routine Blood Work"]
    },
    {
      id: 3,
      vetId: 1,
      userId: 6,
      petId: 3,
      date: "2022-10-20",
      time: "11:00",
      description:
        "Emergency visit for the dog. He got injured while playing and needs immediate attention.",
      status: "pending",
      medium: "offline",
      prescription_description: "Prescription provided in the link below",

      prescription: "https://example.com/prescription2.pdf", // URL to prescription PDF or description text
      medicines: [
        { name: "Pain Reliever", dosage: "1 tablet every 8 hours" },
        { name: "Wound Care Ointment", dosage: "Apply twice daily" }
      ],
      tests: ["X-ray", "Wound Culture"]
    },
    {
      id: 4,
      vetId: 4,
      userId: 7,
      petId: 4,
      date: "2022-10-25",
      time: "16:45",
      description:
        "Follow-up appointment for the rabbit. Checking the progress after the previous treatment.",
      status: "pending",
      medium: "online",
      prescription_description: "Prescription provided in the link below",

      prescription: "No prescription provided", // Example text for cases without a PDF
      medicines: [
        { name: "Antibiotic Drops", dosage: "2 drops in each eye twice a day" }
      ],
      tests: ["Eye Examination"]
    }
  ];
  
  

function AppointmentCompletedContainer({ text }) {
  const [showAll, setShowAll] = useState(false);

  // Determine the number of items to show based on the state
  const itemsToShow = showAll ? appointmentRequests : appointmentRequests.slice(0, 6);

  return (
    <div className="bg bg-base-200 m-0 p-0 mb-4 rounded-xl">
      <h1 className="text-3xl font-bold ml-3">{text}</h1>
      <div className="grid grid-cols-1 gap-1 align-middle overflow-y-auto h-[60vh]">
        {itemsToShow.map((item, index) => (
          <AppointmentCompleted key={index} appointmentRequest={item} userType="seller" />
        ))}
      </div>
      
    </div>
  );
}

export default AppointmentCompletedContainer;
