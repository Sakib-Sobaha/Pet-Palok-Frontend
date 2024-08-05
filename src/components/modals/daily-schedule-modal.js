import React from "react";
import { useState } from "react";

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

const DailyScheduleModal = ({
  element_id,
  tarikh,
  appointments,
  isOpen,
  onClose,
}) => {
  // Function to format appointments into hour intervals
  const getHourlyAppointments = () => {
    const hourlyAppointments = Array.from({ length: 24 }, () => []);

    appointments.forEach((appointment) => {
      const appointmentHour = parseInt(appointment.booking_time.split(":")[0]);
      hourlyAppointments[appointmentHour].push(appointment);
    });

    return hourlyAppointments;
  };

  const hourlyAppointments = getHourlyAppointments();

  const lenMax = 15;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {isOpen && (
        <dialog id={element_id} className="modal" open>
          <div className="modal-box">
            <button className="btn btn-error btn-sm float-right" onClick={onClose}>
              X
            </button>
            <h3 className="font-bold text-lg">
              Date: {tarikh.format("DD-MM-YY")}
            </h3>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Description</th>
                    <th>User & Pet</th>
                    <th>Medium</th>
                  </tr>
                </thead>
                <tbody>
                  {hourlyAppointments.map((hourlySlot, index) => (
                    <tr key={index} className="hover:bg-base-200">
                      <td>
                        {index}:00 - {index + 1}:00
                      </td>
                      <td colSpan={5}>
                        {hourlySlot.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {hourlySlot.map((appointment) => (
                              <div
                                key={appointment.id}
                                className="flex items-center gap-3"
                              >
                                <div>
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
                                        className="text-primary "
                                      >
                                        {isExpanded ? "See Less" : "See More"}
                                      </button>
                                    )}
                                  </span>
                                  <br />
                                  <span className="badge badge-warning badge-sm">
                                    {pet.type}
                                  </span>
                                  <span className="ml-2 badge badge-info badge-sm">
                                    {pet.breed}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {user.firstname + " " + user.lastname}
                                  </div>
                      
                                  <div className="text-sm opacity-50">
                                    {pet.name}
                                  </div>
                                </div>
                                <div>
                                  <span className="badge badge-ghost badge-sm">
                                    {appointment.medium}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            No appointments
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th>Time</th>
                    <th>Description</th>
                    <th>User & Pet</th>
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
