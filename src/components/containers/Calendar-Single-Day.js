import React from "react";

const CalendarSingleDay = ({ day, currentDate, appointmentRequests }) => {
  const appointmentsForDay = (day) => {
    const dateString = currentDate.format(
      `YYYY-MM-${String(day).padStart(2, "0")}`
    );
    return appointmentRequests.filter(
      (appointment) => appointment.booking_date === dateString
    );
  };
  return (
    <div
      
      className="cursor-pointer"
    >
      <span className="text-sm font-bold">{day}</span>
      <div className="flex flex-col gap-1 h-full">
        {appointmentsForDay(day).map((appointment) => (
          <div
            key={appointment.id}
            className="bg-secondary text-content text-xs rounded p-1"
            
          >
            
            {appointment.booking_time} - {appointment.description.slice(0, 12)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSingleDay;
