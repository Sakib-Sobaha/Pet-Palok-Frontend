import React, { useEffect, useState } from "react";

const DailyScheduleModal = ({
  element_id,
  tarikh,
  appointments,
  isOpen,
  onClose,
}) => {
  const userType = localStorage.getItem("userType");
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const lenMax = 15;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const getHourlyAppointments = () => {
    const hourlyAppointments = Array.from({ length: 24 }, () => []);
    appointments.forEach((appointment) => {
      const appointmentHour = new Date(appointment.bookingTime).getUTCHours();
      hourlyAppointments[appointmentHour]?.push(appointment);
    });
    return hourlyAppointments;
  };

  const hourlyAppointments = getHourlyAppointments();

  useEffect(() => {
    // Fetch all details for each appointment and store them in the state
    const fetchAppointmentDetails = async (appointment) => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      try {
        const userUrl = `${process.env.REACT_APP_API_URL}/user/getUserById/${appointment.userId}`;
        const petUrl = `${process.env.REACT_APP_API_URL}/pets/${appointment.petId}`;
        const vetUrl = `${process.env.REACT_APP_API_URL}/vet/getVetById/${appointment.vetId}`;

        const [userResponse, petResponse, vetResponse] = await Promise.all([
          fetch(userUrl, { method: "GET", headers }),
          fetch(petUrl, { method: "GET", headers }),
          fetch(vetUrl, { method: "GET", headers }),
        ]);

        if (!userResponse.ok || !petResponse.ok || !vetResponse.ok) {
          throw new Error("Error fetching details");
        }

        const [user, pet, vet] = await Promise.all([
          userResponse.json(),
          petResponse.json(),
          vetResponse.json(),
        ]);

        setAppointmentDetails((prevDetails) => ({
          ...prevDetails,
          [appointment.id]: { user, pet, vet },
        }));
      } catch (error) {
        console.error("Failed to fetch appointment details:", error);
      }
    };

    appointments.forEach((appointment) => {
      fetchAppointmentDetails(appointment);
    });
  }, [appointments]);

  return (
    <div>
      {isOpen && (
        <dialog id={element_id} className="modal" open>
          <div className="modal-box w-11/12 max-w-3xl">
            <button
              className="btn btn-error btn-sm float-right"
              onClick={onClose}
            >
              X
            </button>
            <h3 className="font-bold text-lg">
              Daily Schedule for {": " + tarikh.format("DD MMMM, YYYY")}
            </h3>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Description</th>
                    <th>{userType === "user" ? "Vet" : "User & Pet"}</th>
                    {userType === "user" && <th>Pet</th>}
                    <th>Medium</th>
                  </tr>
                </thead>

                <tbody>
                  {hourlyAppointments.map((hourlySlot, index) => (
                    <tr key={index} className="hover:bg-base-200">
                      <td className="align-top">
                        {index}:00 - {index + 1}:00
                      </td>
                      <td className="align-top">
                        {hourlySlot.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {hourlySlot.map((appointment) => (
                              <div key={appointment.id} className="">
                                <span className="font-bold">
                                  {isExpanded ||
                                  appointment.description.split(" ").length <=
                                    lenMax
                                    ? appointment.description
                                    : `${appointment.description
                                        .split(" ")
                                        .slice(0, lenMax)
                                        .join(" ")}...`}
                                  {appointment.description.split(" ").length >
                                    lenMax && (
                                    <button
                                      onClick={toggleDescription}
                                      className="text-primary ml-1"
                                    >
                                      {isExpanded ? "See Less" : "See More"}
                                    </button>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            No appointments
                          </span>
                        )}
                      </td>

                      {/* Vet details for users, User & Pet details for vets */}
                      <td className="align-top">
                        {hourlySlot.length > 0 ? (
                          hourlySlot.map((appointment) => {
                            const details = appointmentDetails[appointment.id];
                            return details ? (
                              <div key={appointment.id} className="mb-2">
                                {userType === "user" ? (
                                  <div className="flex">
                                    <div className="avatar mr-4">
                                      <div className="mask mask-squircle w-16">
                                        <img
                                          src={details.vet?.profileImage}
                                          alt="Vet"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="font-bold">
                                        {details.vet?.firstname +
                                          " " +
                                          details.vet?.lastname}
                                      </div>
                                      <div className="text-sm opacity-50 italic">
                                        {details.vet?.clinic_name}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex">
                                    <div className="avatar mr-4">
                                      <div className="mask mask-squircle w-16">
                                        <img
                                          src={details.pet?.images[0]}
                                          alt="Pet"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="font-bold">
                                        {details.user?.firstname +
                                          " " +
                                          details.user?.lastname}
                                      </div>
                                      <div className="text-sm opacity-50 italic">
                                        {details.pet?.name}
                                      </div>
                                      <div className="flex mt-1">
                                        <h1
                                          className="badge badge-warning text-xs font-semibold"
                                          style={{
                                            padding: "0.5em 1em",
                                            lineHeight: "1.2",
                                          }}
                                        >
                                          {details.pet?.type}
                                        </h1>
                                        <h1
                                          className="font-semibold text-xs badge badge-lg badge-info"
                                          style={{
                                            padding: "0.5em 1em",
                                            lineHeight: "1.2",
                                          }}
                                        >
                                          {details.pet?.breed}
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">
                                Loading...
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>

                      {/* Pet details for users */}
                      {userType === "user" && (
                        <td className="align-top">
                          {hourlySlot.length > 0 ? (
                            hourlySlot.map((appointment) => {
                              const details =
                                appointmentDetails[appointment.id];
                              return details ? (
                                <div key={appointment.id} className="mb-2">
                                  <div className="flex">
                                    <div className="avatar mr-4">
                                      <div className="mask mask-squircle w-16">
                                        <img
                                          src={details.pet?.images[0]}
                                          alt="Pet"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="font-bold">
                                        {details.pet?.name}
                                      </div>
                                      <div className="text-sm opacity-50 italic">
                                        {details.pet?.type} -{" "}
                                        {details.pet?.breed}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500">
                                  Loading...
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-sm text-gray-500">-</span>
                          )}
                        </td>
                      )}

                      <td className="align-top">
                        {hourlySlot.length > 0 ? (
                          hourlySlot.map((appointment) => (
                            <div key={appointment.id} className="mb-2">
                              <span className="badge badge-ghost badge-sm">
                                {appointment.online ? "Online" : "Offline"}
                              </span>
                              <span className="badge badge-secondary text-xs badge-xs">
                                {appointment?.state}
                              </span>

                              <button
                                className="btn btn-primary rounded-lg p-1 text-xs px-2"
                                onClick={() => {
                                  window.location.href = `/appointment/${appointment.id}`;
                                }}
                              >
                                Go To Appointment
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <th>Time</th>
                    <th>Description</th>
                    <th>{userType === "user" ? "Vet" : "User & Pet"}</th>
                    {userType === "user" && <th>Pet</th>}
                    <th>Medium</th>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="modal-action">
              <button className="btn btn-primary">Add</button>
              <button className="btn btn-error" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DailyScheduleModal;
