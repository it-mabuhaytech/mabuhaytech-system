import React, { useState } from 'react';

const HealthChecker: React.FC = () => {
  const [urls, setUrls] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const urlArray = urls.split(',').map(url => url.trim());

    setLoading(true);
    const response = await fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: urlArray }),
    });

    const data = await response.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto my-5 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl text-black font-bold text-center mb-4">Website Health Checker</h1>
      <p>Please include full URL address. For example, `https://www.shashin.ai`</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="Enter URLs separated by commas"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          rows={5}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? 'Checking...' : 'Check Health'}
        </button>
      </form>
      <div className="mt-6">
        {results.map((result, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-2">
            <p>
              {result.url}:{' '}
              <strong className={result.healthy ? 'text-green-600' : 'text-red-600'}>
                {result.healthy ? 'Healthy' : 'Unhealthy'}
              </strong> (Status: {result.status})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthChecker;
