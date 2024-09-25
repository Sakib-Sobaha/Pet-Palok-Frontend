import React, { useState, useEffect } from "react";

import dayjs from "dayjs"; // For handling dates

import DayScheduleModal from "../modals/daily-schedule-modal";

function Calendar() {
  const [loading, setLoading] = useState(false); // State to manage loading
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const today = dayjs();

  const [selectedDate, setSelectedDate] = useState(null); // State to manage selected date
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startWeekday = startOfMonth.day(); // 0 (Sunday) to 6 (Saturday)
  const daysInMonth = endOfMonth.date();

  const daysArray = [];
  for (let i = 0; i < startWeekday; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const previousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const appointmentsForDay = (day) => {
    const dateString = currentDate.format(
      `YYYY-MM-${String(day).padStart(2, "0")}`
    );

    // console.log("dates:"+JSON.stringify(appointments.len));
    return appointments.filter((appointment) => {
      console.log(
        "booking time check before :) " +
          JSON.stringify(appointment.bookingTime)
      );
      {}

      const bookingDate = dayjs(new Date(appointment.bookingTime).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC", // Forces UTC timezone
        }
      )).format("YYYY-MM-DD");
      console.log("booking date check:" + bookingDate);
      console.log("booking time check after ->" + appointment.bookingTime);

      return bookingDate === dateString;
    });
  };

  const handleDayClick = (day) => {
    setSelectedDate(currentDate.date(day));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch appointment requests data when the component mounts
    const fetchAppointments = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const userType = localStorage.getItem("userType");
      if (!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        const url = `${process.env.REACT_APP_API_URL}/appointments/${userType}/fetchAll`;
        const headers = new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });

        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          const errorText = await response.json();
          throw new Error(
            `Network response was not ok. Status: ${response.status}, ${errorText}`
          );
        }

        const data = await response.json();
        setAppointments(data); // Set the fetched data to state
      } catch (error) {
        console.error("Failed to fetch appointment requests:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-dots"></span>
      </div>
    );
  } else
    return (
      <div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={previousMonth}
              className=" px-2 py-1 btn btn-ghost border-gray-500 rounded-lg"
            >
              Previous
            </button>
            <h2 className="text-xl font-semibold">
              {currentDate.format("MMMM YYYY")}
            </h2>
            <button
              onClick={nextMonth}
              className="px-2 py-1 btn btn-ghost border-gray-500 rounded-lg"
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((bar) => (
              <div key={bar} className="font-bold">
                {bar}
              </div>
            ))}

            {daysArray.map((day, index) => (
              <div
                key={index}
                className={`h-20 border cursor-pointer hover:scale-105 hover:bg-primary hover:text-gray-800 p-1 ${
                  day
                    ? currentDate.date(day).isSame(dayjs(), "day")
                      ? "bg-warning text-gray-800" // If it's today
                      : "bg-base-100" // If it's a normal day
                    : "bg-base-300" // If it's not a real day
                } flex flex-col justify-between`}
                onClick={() => {
                  handleDayClick(day);
                }}
              >
                {day && (
                  <>
                    <div className="cursor-pointer">
                      <span className="text-sm font-bold">{day}</span>

                      <div className="relative flex flex-col gap-1 h-full">
                        {appointmentsForDay(day).length > 0 && (
                          <>
                            {/* Show the first appointment */}
                            <div className="bg-secondary text-content text-xs rounded p-1">
                              {new Date(
                                appointmentsForDay(day)[0].bookingTime
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true, // Ensures 12-hour format with AM/PM
                                timeZone: "UTC", // Forces UTC timezone
                              })}
                              {appointmentsForDay(day)[0].description.slice(
                                0,
                                12
                              ) + "..."}
                            </div>

                            {/* Show a badge if there are additional appointments */}
                            {appointmentsForDay(day).length > 1 && (
                              <div className="absolute inset-0 flex items-end justify-end p-2">
                                <div className="indicator">
                                  <span className="indicator-item badge badge-secondary">
                                    +{appointmentsForDay(day).length - 1}
                                  </span>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            {selectedDate && (
              <DayScheduleModal
                element_id="daily_schedule_modal"
                tarikh={selectedDate}
                appointments={appointmentsForDay(selectedDate.date())}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
        <div className=" overflow-x-auto">
          {/* {console.log(JSON.stringify(appointments))} */}
        </div>
      </div>
    );
}

export default Calendar;
