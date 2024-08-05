import React, { useState } from "react";
import dayjs from "dayjs"; // For handling dates
import DayScheduleModal from "../modals/daily-schedule-modal";

const appointmentRequests = [
  {
    id: 1,
    vetId: 2,
    userId: 4,
    petId: 1,
    request_date: "2024-08-01",
    booking_date: "2024-08-01",
    booking_time: "10:00",
    description:
      "Check up, the dog has been coughing. I tried to give him some medicine but it doesn't seem to work. At last, I decided to bring him to the vet.",
    status: "confirmed",
    medium: "offline",
  },
  {
    id: 2,
    vetId: 3,
    userId: 5,
    petId: 2,
    request_date: "2024-08-01",
    booking_date: "2024-08-15",
    booking_time: "14:00",
    description: "Regular vaccination visit.",
    status: "confirmed",
    medium: "online",
  },
  {
    id: 3,
    vetId: 2,
    userId: 4,
    petId: 1,
    request_date: "2024-01-01",
    booking_date: "2024-08-09",
    booking_time: "18:00",
    description: "Follow-up visit for cough treatment.",
    status: "confirmed",
    medium: "offline",
  },
  {
    id: 4,
    vetId: 2,
    userId: 4,
    petId: 1,
    request_date: "2024-01-01",
    booking_date: "2024-08-09",
    booking_time: "16:00",
    description: "hudai taka beshi tai tore dite aisi ar dekhaite.",
    status: "confirmed",
    medium: "offline",
  },
  // Add more sample appointments as needed
];

function Calendar() {
  // current date mane currently active date er mash/date
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
    return appointmentRequests.filter(
      (appointment) => appointment.booking_date === dateString
    );
  };

  const handleDayClick = (day) => {
    setSelectedDate(currentDate.date(day));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* {console.log(daysArray[0])} */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={previousMonth}
          className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={nextMonth}
          className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
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
            className={`h-20 border cursor-pointer hover:scale-105 hover:bg-primary p-1 ${
              day
                ? currentDate.date(day).isSame(dayjs(), "day")
                  ? "bg-warning" // If it's today
                  : "bg-base-100" // If it's a normal day
                : "bg-base-300" // If it's not a real day
            } flex flex-col justify-between`}
            onClick={() => {
              //   document.getElementById("daily_schedule_modal").showModal();
              handleDayClick(day);
            }}
          >
            {day && (
              <>
                {/* <DayScheduleModal
                  element_id="daily_schedule_modal"
                  tarikh={currentDate.date(day)}
                  appointments={appointmentsForDay(day)}
                /> */}

                <div className="cursor-pointer">
                  <span className="text-sm font-bold">{day}</span>

                  <div className="flex flex-col gap-1 h-full">
                    {/* ekhane kaj korte hobe, more than one hole kisu ekta */}
                    {appointmentsForDay(day).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-secondary text-content text-xs rounded p-1"
                      >
                        {appointment.booking_time} -{" "}
                        {appointment.description.slice(0, 12)}
                      </div>
                    ))}
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
            appointments={
                appointmentsForDay(selectedDate.date())
            }
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default Calendar;
