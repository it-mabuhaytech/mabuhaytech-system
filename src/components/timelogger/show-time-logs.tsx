import { useEffect, useState } from 'react';

  type Log = {
    userid: number;
    logType: 0 | 1 | 2 | 3;
    logTime: string;
    logDate: string;
  };
  
  type GroupedLog = {
    userid: number;
    log_date: string;
    log_in: string | null;
    log_out: string | null;
    lunch_break_in: string | null;
    lunch_break_out: string | null;
    log_time_out: string | null;
  };

const TimeLogTable: React.FC = () => {
    // const [timeLogs, setTimeLogs] = useState<TimeLogs[]>([]);
    const [logs, setLogs] = useState<GroupedLog[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<GroupedLog[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const userid = typeof window !== 'undefined' ? localStorage.getItem('userid') : null

    // Function to convert MM/DD/YYYY to YYYY-MM-DD
    const formatDateForInput = (date: string): string => {
      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

  // Get the current date and determine the default date range
  const getDefaultDateRange = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let defaultStartDate: Date;
    const defaultEndDate: Date = today;

    // If today is between the 1st and the 15th, set the range from 1st to today
    if (currentDay <= 15) {
      defaultStartDate = new Date(currentYear, currentMonth, 1);
    } else {
      // If today is between the 16th and end of the month, set the range from 16th to today
      defaultStartDate = new Date(currentYear, currentMonth, 16);
    }

    return {
      start: defaultStartDate.toISOString().split('T')[0], // Format to 'YYYY-MM-DD'
      end: defaultEndDate.toISOString().split('T')[0], // Format to 'YYYY-MM-DD'
    };
  };

  useEffect(() => {
    const fetchLogs = async () => {

        const response = await fetch(`/api/timelogs/getAllUserTimeLogs?id=${userid}` , {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json()
          // Group logs by log date and user id
          const groupedLogs = data.reduce((acc: { [key: string]: GroupedLog }, log: Log) => {
            const groupKey = `${log.logDate}-${log.userid}`;

            if (!acc[groupKey]) {
              acc[groupKey] = {
                userid: log.userid,
                log_date: log.logDate,
                log_in: null,
                log_out: null,
                lunch_break_in: null,
                lunch_break_out: null,
                log_time_out: null,
              };
            }

            switch (log.logType) {
              case 0:
                acc[groupKey].log_in = log.logTime;
                break;
              case 3:
                acc[groupKey].log_out = log.logTime;
                break;
              case 2:
                acc[groupKey].lunch_break_in = log.logTime;
                break;
              case 1:
                acc[groupKey].lunch_break_out = log.logTime;
                break;
              default:
                break;
            }

            return acc;
          }, {});

           // Convert object to array for rendering
          const groupedLogsArray : GroupedLog[] = Object.values(groupedLogs);
          setLogs(groupedLogsArray);
          setFilteredLogs(groupedLogsArray); // Initially display all logs
    }
    fetchLogs();
  }, []);

  // Handle filtering by date range
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = logs.filter((log) => {
        const logDate = formatDateForInput(log.log_date); // Convert MM/DD/YYYY to YYYY-MM-DD
        return logDate >= startDate && logDate <= endDate;
      });
      setFilteredLogs(filtered);
    }
  };


  useEffect(() => {
    const { start, end } = getDefaultDateRange();
    setStartDate(start);
    setEndDate(end);
  }, []);

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-4">User Log Summary</h1>

     {/* Date Range Filters */}
     <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleFilter}
          className="mt-5 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Filter
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-center">User ID</th>
            <th className="px-4 py-2 border-b text-center">Date</th>
            <th className="px-4 py-2 border-b text-center">Log In</th>
            <th className="px-4 py-2 border-b text-center">Lunch Break In</th>
            <th className="px-4 py-2 border-b text-center">Lunch Break Out</th>
            <th className="px-4 py-2 border-b text-center">Log Out</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr key={`${log.log_date}-${log.userid}`} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b text-center">{log.userid || '-'}</td>
              <td className="px-4 py-2 border-b text-center">{log.log_date || '-'}</td>
              <td className="px-4 py-2 border-b text-center">{log.log_in || '-'}</td>
              <td className="px-4 py-2 border-b text-center">{log.lunch_break_in || '-'}</td>
              <td className="px-4 py-2 border-b text-center">{log.lunch_break_out || '-'}</td>
              <td className="px-4 py-2 border-b text-center">{log.log_out || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeLogTable;
