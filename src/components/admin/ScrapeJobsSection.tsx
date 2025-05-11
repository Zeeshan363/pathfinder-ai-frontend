import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  onViewScrapedJobs: () => void;
};

const ScrapeJobsSection: React.FC<Props> = ({ onViewScrapedJobs }) => {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}/jobs/scrape/`,
        { keywords, location, limit },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setResult(res.data.message || 'Scraping complete!');
    } catch (err: any) {
      setResult(err?.response?.data?.message || 'Failed to scrape jobs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Scrape New Jobs from LinkedIn</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Keywords</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={keywords} onChange={e => setKeywords(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={location} onChange={e => setLocation(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Limit</label>
          <input type="number" className="w-full border rounded px-3 py-2" value={limit} min={1} max={50} onChange={e => setLimit(Number(e.target.value))} required />
        </div>
        <button type="submit" className="bg-purple-800 text-white rounded px-6 py-2 font-semibold" disabled={loading}>{loading ? 'Scraping...' : 'Scrape Jobs'}</button>
      </form>
      {result && <div className="mt-4 text-green-700 font-medium">{result}</div>}
      <button className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-6 py-2 font-semibold" onClick={onViewScrapedJobs}>View Scraped Jobs</button>
    </div>
  );
};

export default ScrapeJobsSection; 