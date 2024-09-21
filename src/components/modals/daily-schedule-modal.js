import React, { useEffect, useState } from "react";

const DailyScheduleModal = ({
  element_id,
  tarikh,
  appointments,
  isOpen,
  onClose,
}) => {
  const userType = localStorage.getItem("userType");
  const [user, setUser] = useState(null);
  const [pet, setPet] = useState(null);
  const [vet, setVet] = useState(null);

  const getHourlyAppointments = () => {
    const hourlyAppointments = Array.from({ length: 24 }, () => []);

    appointments.forEach((appointment) => {
      const appointmentHour = new Date(appointment.bookingTime).getUTCHours();
      hourlyAppointments[appointmentHour]?.push(appointment);
    });

    return hourlyAppointments;
  };

  const hourlyAppointments = getHourlyAppointments();
  const lenMax = 15;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const userUrl = `${process.env.REACT_APP_API_URL}/user/getUserById/${appointments[0].userId}`;
    const petUrl = `${process.env.REACT_APP_API_URL}/pets/${appointments[0].petId}`;
    const vetUrl = `${process.env.REACT_APP_API_URL}/vet/getVetById/${appointments[0].vetId}`;

    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        const headers = new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });

        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(userUrl, requestOptions);

        if (!response.ok) {
          const errorText = await response.json();
          throw new Error(
            `Network response was not ok. Status: ${response.status}, ${errorText}`
          );
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    const fetchPet = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        const headers = new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });

        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(petUrl, requestOptions);

        if (!response.ok) {
          const errorText = await response.json();
          throw new Error(
            `Network response was not ok. Status: ${response.status}, ${errorText}`
          );
        }

        const data = await response.json();
        setPet(data);
      } catch (error) {
        console.error("Failed to fetch pet:", error);
      }
    };

    const fetchVet = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        const headers = new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });

        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(vetUrl, requestOptions);

        if (!response.ok) {
          const errorText = await response.json();
          throw new Error(
            `Network response was not ok. Status: ${response.status}, ${errorText}`
          );
        }

        const data = await response.json();
        setVet(data);
      } catch (error) {
        console.error("Failed to fetch vet:", error);
      }
    };

    fetchUser();
    fetchPet();
    fetchVet();
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
                              <div key={appointment.id}>
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
                        {userType === "user" ? (
                          hourlySlot.length > 0 ? (
                            hourlySlot.map((appointment) => (
                              <div key={appointment.id} className="mb-2">
                                <div className="flex">
                                  <div className="avatar mr-4">
                                    <div className="mask mask-squircle w-16">
                                      <img src={vet?.profileImage} alt="" />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold">
                                      {vet?.firstname + " " + vet?.lastname}
                                    </div>
                                    <div className="text-sm opacity-50 italic">
                                      {vet?.clinic_name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">-</span>
                          )
                        ) : (
                          hourlySlot.length > 0 ? (
                            hourlySlot.map((appointment) => (
                              <div key={appointment.id} className="mb-2">
                                <div className="flex">
                                  <div className="avatar mr-4">
                                    <div className="mask mask-squircle w-16">
                                      <img src={pet?.images[0]} alt="" />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold">
                                      {user?.firstname + " " + user?.lastname}
                                    </div>
                                    <div className="text-sm opacity-50 italic">
                                      {pet?.name}
                                    </div>
                                    <div className="flex mt-1">
                                      <span className="badge badge-warning badge-sm">
                                        {pet?.type}
                                      </span>
                                      <span
                                        className="ml-2 badge badge-info inline-block badge-sm"
                                        style={{
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        {pet?.breed}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">-</span>
                          )
                        )}
                      </td>

                      {/* Pet details for users */}
                      {userType === "user" && (
                        <td className="align-top">
                          {hourlySlot.length > 0 ? (
                            hourlySlot.map((appointment) => (
                              <div key={appointment.id} className="mb-2">
                                <div className="flex">
                                  <div className="avatar mr-4">
                                    <div className="mask mask-squircle w-16">
                                      <img src={pet?.images[0]} alt="" />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold">
                                      {pet?.name}
                                    </div>
                                    <div className="text-sm opacity-50 italic">
                                      {pet?.type} - {pet?.breed}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
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
