"use client";
import { useState, useEffect } from "react";

interface TimeLog {
    userid: number;
    logType: number;
    logTime: string;
    logDate: string;
}

type TimeLogs = TimeLog[];

const TimeTracking: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>("");
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
    const [lunchInTime, setLunchInTime] = useState<string | null>(null);
    const [lunchOutTime, setLunchOutTime] = useState<string | null>(null);
    const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
    const [isCheckedOut, setIsCheckedOut] = useState<boolean>(false);
    const [isLunchIn, setIsLunchIn] = useState<boolean>(false);
    const [isLunchOut, setIsLunchOut] = useState<boolean>(false);
    const [timeLogs, setTimeLogs] = useState<TimeLogs | null>(null);
    // const [isLoading, setIsLoading] = useState(false);

    const userid =
        typeof window !== "undefined" ? localStorage.getItem("userid") : null;

    useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
            const current = new Date().toLocaleTimeString();
            setCurrentTime(current);
        }, 1000);

        // Update the displayed logs
        updateLogs();

        return () => clearInterval(interval);
    }, []);

  const handleSaveLogs = (logType: number) => {
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    
    if (logType == 0) {
      setIsCheckedIn(true);
      setIsLunchOut(false);
      setIsLunchIn(true);
      setIsCheckedOut(false);
    } else if (logType == 1) {
      setIsLunchOut(true);
      setIsLunchIn(false);
      setIsCheckedOut(true);
    } else if (logType == 2) {
      setIsLunchIn(true);
      setIsCheckedOut(false);
    } else if (logType == 3) {
      setIsCheckedOut(true)
    }
    saveLogToDB(Number(userid),logType,time,date);
  }

  async function saveLogToDB(userid: number, logType: number, logTime: string, logDate: string) {
    const response = await fetch('/api/timelogs/addTimeLog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid, logType, logTime, logDate }),
    });
    updateLogs();
    console.log(response.status);
  }

  async function getUserTimeLogs() {
    try{
      const startDate = new Date().toLocaleDateString();
      const endDate = new Date().toLocaleDateString();
      const response = await fetch(`/api/timelogs/getUserTimeLogs?id=${userid}&startDate=${startDate}&endDate=${endDate}` , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: TimeLogs = await response.json()
      setTimeLogs(data);
      console.log(timeLogs);
      return data;
    }  catch (error: any) {
      return error;
    }
  }

  function updateLogs(){
    getUserTimeLogs().then(function(result){
      if(result.length > 0){
        result.forEach((element: any) => {
          if(element.logType == 0){
            // if (checkInTime !== element.logTime){
              setCheckInTime(element.logTime);
            // }
            setIsCheckedIn(true);
            setIsLunchOut(false);
            setIsLunchIn(true);
            setIsCheckedOut(false);
<<<<<<< HEAD
        } else if (logType == 1) {
            setIsLunchOut(true);
            setIsLunchIn(false);
            setIsCheckedOut(true);
        } else if (logType == 2) {
            setIsLunchIn(true);
            setIsCheckedOut(false);
        } else if (logType == 3) {
            setIsCheckedOut(true);
        }
        saveLogToDB(Number(userid), logType, time, date);
    };

    async function saveLogToDB(
        userid: number,
        logType: number,
        logTime: string,
        logDate: string
    ) {
        const response = await fetch("/api/timelogs/addTimeLog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid, logType, logTime, logDate }),
=======
          } else if (element.logType == 1) {
            // if (lunchOutTime !== element.logTime){
              setLunchOutTime(element.logTime);
            // }
            setIsLunchOut(true);
            setIsLunchIn(false);
            setIsCheckedOut(true);
          } else if (element.logType == 2) {
            // if (lunchInTime !== element.logTime){
              setLunchInTime(element.logTime);
            // }
            setIsLunchIn(true);
            setIsCheckedOut(false);
          } else if (element.logType == 3) {
            // if (checkOutTime !== element.logTime){
              setCheckOutTime(element.logTime);
            // }
            setIsCheckedOut(true)
          } else {
            return "log type is not supported";
          }
>>>>>>> 7bf8ce4 (Add leave request features and page)
        });

        console.log(response.status);
    }

    async function getUserTimeLogs(): Promise<TimeLogs | undefined> {
        try {
            const startDate = new Date().toLocaleDateString();
            const endDate = new Date().toLocaleDateString();
            const response = await fetch(
                `/api/timelogs/getUserTimeLogs?id=${userid}&startDate=${startDate}&endDate=${endDate}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data: TimeLogs = await response.json();
            setTimeLogs(data);
            console.log(timeLogs);
            return data;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async function updateLogs() {
        getUserTimeLogs().then((result) => {
            if (result && result.length > 0) {
                result.forEach((element: TimeLog) => {
                    if (element.logType == 0) {
                        if (checkInTime !== element.logTime) {
                            setCheckInTime(element.logTime);
                        }
                        setIsCheckedIn(true);
                        setIsLunchOut(false);
                        setIsLunchIn(true);
                        setIsCheckedOut(false);
                    } else if (element.logType == 1) {
                        if (checkInTime !== element.logTime) {
                            setLunchOutTime(element.logTime);
                        }
                        setIsLunchOut(true);
                        setIsLunchIn(false);
                        setIsCheckedOut(true);
                    } else if (element.logType == 2) {
                        if (checkInTime !== element.logTime) {
                            setLunchInTime(element.logTime);
                        }
                        setIsLunchIn(true);
                        setIsCheckedOut(false);
                    } else if (element.logType == 3) {
                        if (checkOutTime !== element.logTime) {
                            setCheckOutTime(element.logTime);
                        }
                        setIsCheckedOut(true);
                    } else {
                        return "log type is not supported";
                    }
                });
            } else {
                setIsCheckedIn(false);
                setIsLunchOut(true);
                setIsLunchIn(true);
                setIsCheckedOut(true);
            }
        });
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Employee Time Tracker
            </h1>

            {/* Current Time */}
            <div className="text-center">
                <h2 className="text-xl font-medium text-gray-600">
                    Current Time
                </h2>
                <p className="text-4xl font-bold text-gray-800">
                    {currentTime}
                </p>
            </div>

            {/* Time Records */}
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                        Check-In Time:
                    </span>
                    <span>{checkInTime ?? "Not recorded"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                        Lunch Out Time:
                    </span>
                    <span>{lunchOutTime ?? "Not recorded"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                        Lunch In Time:
                    </span>
                    <span>{lunchInTime ?? "Not recorded"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                        Check-Out Time:
                    </span>
                    <span>{checkOutTime ?? "Not recorded"}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
                <button
                    onClick={() => handleSaveLogs(0)}
                    className={`px-6 py-2 w-40 rounded-md text-white focus:outline-none transition ${
                        isCheckedIn
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isCheckedIn}
                >
                    Check In
                </button>

                <button
                    onClick={() => handleSaveLogs(1)}
                    className={`px-6 py-2 w-40 rounded-md text-white focus:outline-none transition ${
                        isLunchOut
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isLunchOut}
                >
                    Lunch Out
                </button>

                <button
                    onClick={() => handleSaveLogs(2)}
                    className={`px-6 py-2 w-40 rounded-md text-white focus:outline-none transition ${
                        isLunchIn
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isLunchIn}
                >
                    Lunch In
                </button>

                <button
                    onClick={() => handleSaveLogs(3)}
                    className={`px-6 py-2 w-40 rounded-md text-white focus:outline-none transition ${
                        isCheckedOut
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isCheckedOut}
                >
                    Check Out
                </button>
            </div>
        </div>
    );
};

export default TimeTracking;
