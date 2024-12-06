"use client";

import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarView from "../calendar/calendar-view"

type LeaveRequest = {
  userid: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  isFullDay: boolean;
  reason: string;
};

type LeaveRecord = {
  id: number;
  employee_name: string;
  start_date: string;
  end_date: string;
  leave_type: string;
  is_full_day: boolean;
  reason: string;
};

const LeaveRequestForm: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [leaveType, setLeaveType] = useState<string>("");
  const [isFullDay, setIsFullDay] = useState<boolean>(true);
  const [reason, setReason] = useState<string>("");
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);

  const userid = typeof window !== 'undefined' ? localStorage.getItem('userid') : null;

  const fetchLeaveRecords = async () => {
    const response = await fetch('/api/leave-request/getAllLeaveRequest', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json()
    setLeaveRecords(data);
    
    // try {
    //   const connection = connect({ url: "YOUR_TURSO_DATABASE_URL" });
    //   const db = drizzle(connection);

    //   const records: LeaveRecord[] = await db
    //     .select("*")
    //     .from("leave_requests")
    //     .execute();

    //   setLeaveRecords(records);
    // } catch (error) {
    //   console.error("Error fetching leave records:", error);
    // }
  };

  useEffect(() => {
    fetchLeaveRecords();
  }, []);

  const handleSubmit = async () => {
    if (!startDate || !endDate || !leaveType || !reason || !userid) {
      alert("Please fill out all fields.");
      return;
    }

    const leaveRequest: LeaveRequest = {
      userid,
      startDate,
      endDate,
      leaveType,
      isFullDay,
      reason,
    };
    try {
      // Parse the start and end dates
      const startDateDB = new Date(startDate);
      const endDateDB = new Date(endDate);

      // Validate date parsing
      if (isNaN(startDateDB.getTime()) || isNaN(endDateDB.getTime())) {
        console.error("Invalid date format. Please use 'YYYY-MM-DD'.");
        return;
      }

      // Ensure startDate is before or equal to endDate
      if (startDateDB > endDateDB) {
        console.error("Start date must be before or equal to the end date.");
        return;
      }

      // Loop through the dates
        const currentDate = new Date(startDateDB); // Create a copy to avoid modifying startDate
        while (currentDate <= endDateDB) {
          const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // Skip weekends
            const response = await fetch('/api/leave-request/addLeaveRequest', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userid, leaveType, currentDate, isFullDay, status: 0, reason }),
            });
            console.log(currentDate.toISOString().split("T")[0]); // Format as "YYYY-MM-DD"
          }
          currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
        }
        setStartDate('');
        setEndDate('');
        setLeaveType("");
        setReason("");
        fetchLeaveRecords();
    } catch (error) {
      console.error("Error saving leave records to DB:", error);
    }
  };

  return (
    <div className="flex min-w-screen flex-col md:flex-row min-h-screen p-4">
      {/* Leave Request Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 mb-4 md:mb-0">
        <h2 className="text-xl font-semibold mb-4">Leave Request Form</h2>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md !-z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md !-z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leave Type
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Vacation Leave">Vacation Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isFullDay}
            onChange={(e) => setIsFullDay(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Full Day Leave
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for leave"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Leave Request
        </button>
      </div>

      {/* Leave Calendar */}
      <CalendarView></CalendarView>
      {/* <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Leave Calendar</h2>
        <Calendar
          tileContent={({ date }) => {
            const leaves = leaveRecords.filter((record) => {
              const leaveStart = new Date(record.start_date);
              const leaveEnd = new Date(record.end_date);
              return date >= leaveStart && date <= leaveEnd;
            });

            return leaves.length > 0 ? (
              <div className="text-xs text-red-600">
                {leaves.map((leave) => (
                  <div key={leave.id}>{leave.employee_name}</div>
                ))}
              </div>
            ) : null;
          }}
        />
      </div> */}
    </div>
  );
};

export default LeaveRequestForm;
