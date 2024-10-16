import React, { useEffect, useState } from 'react';

const TimeLogger: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLogs((prevLogs) => [...prevLogs, `Logged in at ${currentTime.toLocaleTimeString()}`]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLogs((prevLogs) => [...prevLogs, `Logged out at ${currentTime.toLocaleTimeString()}`]);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">{currentTime.toLocaleTimeString()}</h2>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
            isLoggedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={handleLogin}
          disabled={isLoggedIn}
        >
          Log In
        </button>
        <button
          className={`ml-4 px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
            !isLoggedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
          }`}
          onClick={handleLogout}
          disabled={!isLoggedIn}
        >
          Log Out
        </button>
      </div>
      <h3 className="font-semibold">Logs:</h3>
      <ul className="list-disc list-inside">
        {logs.map((log, index) => (
          <li key={index} className="text-left">{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLogger;
