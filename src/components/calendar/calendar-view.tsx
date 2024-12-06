import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Leave {
  userid: number;
  reason: string;
}

const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [leaves, setLeaves] = useState<Leave[]>([]);

  const fetchLeaves = async (date: Date) => {
    const response = await fetch(`/api/leave-request/getAllLeaveRequest?date=${date.toISOString().split('T')[0]}`);
    const data = await response.json();
    setLeaves(data);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    fetchLeaves(date);
  };

  return (
    <div className="p-4">
      <Calendar onClickDay={handleDateClick} />
      {selectedDate && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Leaves for {selectedDate.toDateString()}:</h2>
          {leaves.length > 0 ? (
            <ul className="list-disc pl-6">
              {leaves.map((leave, index) => (
                <li key={index}>
                  <strong>{leave.userid}</strong>: {leave.reason}
                </li>
              ))}
            </ul>
          ) : (
            <p>No leaves filed for this day.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
