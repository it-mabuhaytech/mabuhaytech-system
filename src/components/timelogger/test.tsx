import { useEffect, useState } from 'react';

interface TimeLog {
  id: number;
  projectName: string;
  description: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

const TimeLogTable: React.FC = () => {
  const [logs, setLogs] = useState<TimeLog[]>([]);

  useEffect(() => {
    async function fetchTimeLogs() {
      const response = await fetch('/api/timeLogs');
      const data = await response.json();
      setLogs(data);
    }

    fetchTimeLogs();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Project Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Start Time</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">End Time</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Created At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 text-sm">{log.projectName}</td>
              <td className="px-4 py-2 text-sm">{log.description}</td>
              <td className="px-4 py-2 text-sm">{new Date(log.startTime).toLocaleString()}</td>
              <td className="px-4 py-2 text-sm">{new Date(log.endTime).toLocaleString()}</td>
              <td className="px-4 py-2 text-sm">{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeLogTable;
