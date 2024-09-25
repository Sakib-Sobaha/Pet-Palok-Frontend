import React, { useState, useEffect } from "react";

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const diffInMilliseconds = currentDate - birthDate;
  const ageDate = new Date(diffInMilliseconds); 
  const years = ageDate.getUTCFullYear() - 1970; 
  const months = ageDate.getUTCMonth(); 
  const days = ageDate.getUTCDate() - 1; 

  if (years === 0 && months === 0) return `${days} days`;
  if (years === 0) return `${months} months, ${days} days`;
  return `${years} years, ${months} months`;
};

function AppointmentRequestCard({ appointmentRequest }) {
  const [user, setUser] = useState(null);
  const [pet, setPet] = useState(null);
  const [vet, setVet] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (appointmentRequest) {
      const fetchData = async () => {
        const userUrl = `${process.env.REACT_APP_API_URL}/user/getUserById/${appointmentRequest?.userId}`;
        const petUrl = `${process.env.REACT_APP_API_URL}/pets/${appointmentRequest?.petId}`;
        const vetUrl = `${process.env.REACT_APP_API_URL}/vet/getVetById/${appointmentRequest?.vetId}`;

        const [userRes, petRes, vetRes] = await Promise.all([
          fetch(userUrl, { headers: { Authorization: `Bearer ${authToken}` } }),
          fetch(petUrl, { headers: { Authorization: `Bearer ${authToken}` } }),
          fetch(vetUrl, { headers: { Authorization: `Bearer ${authToken}` } }),
        ]);

        setUser(await userRes.json());
        setPet(await petRes.json());
        setVet(await vetRes.json());
      };

      fetchData();
    }
  }, [appointmentRequest]);

  if (!user || !pet || !vet) {
    return (
      <div className="card bg-base-100 w-96 shadow-xl p-4">
        <div className="skeleton h-32 w-full mb-4"></div>
        <div className="skeleton h-4 w-1/2 mb-2"></div>
        <div className="skeleton h-4 w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-sm font-semibold">
          {pet?.name} - {calculateAge(pet?.dob)}
          <div className="badge badge-secondary">{pet?.type}</div>
        </h2>

        <p className="text-xs">Breed: {pet?.breed}</p>

        <div className="card-actions mt-4 flex justify-between text-xs">
          <div className="flex flex-col">
            <span className="font-bold">Vet:</span>
            <span className="text-accent cursor-pointer hover:underline">
              {vet?.firstname} {vet?.lastname}
            </span>
            <span>{vet?.clinicName}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Applicant:</span>
            <span className="cursor-pointer hover:underline">
              {user?.firstname} {user?.lastname}
            </span>
          </div>
        </div>

        <div className="flex justify-between text-xs mt-4">
          <span>Appointment: {new Date(appointmentRequest?.bookingTime).toLocaleDateString()}</span>
          <span>{new Date(appointmentRequest?.bookingTime).toLocaleTimeString()}</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-primary"
            onClick={() => {
              window.location.href = `/appointment/${appointmentRequest?.id}`;
            }}
          >Details</button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentRequestCard;
