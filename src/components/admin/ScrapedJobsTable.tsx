import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  date_posted: string;
  url: string;
}

interface PaginatedResponse {
  results: Job[];
  count: number;
  next: string | null;
  previous: string | null;
}

const ScrapedJobsTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    axios.get<PaginatedResponse>(`${process.env.REACT_APP_LOCAL_BACKEND}/jobs/?page=${page}&page_size=${pageSize}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    )
      .then(res => {
        // Sort jobs by date_posted descending (latest first)
        const sorted = [...res.data.results].sort((a, b) => new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime());
        setJobs(sorted);
        setCount(res.data.count);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">Scraped Jobs</h2>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-2 text-left font-semibold">Title</th>
              <th className="py-3 px-2 text-left font-semibold">Company</th>
              <th className="py-3 px-2 text-left font-semibold">Location</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id} className="border-b last:border-b-0">
                <td className="py-2 px-2">{job.title}</td>
                <td className="py-2 px-2">{job.company}</td>
                <td className="py-2 px-2">{job.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex items-center gap-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-purple-800 text-white rounded px-4 py-2 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="bg-purple-800 text-white rounded px-4 py-2 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed">Next</button>
      </div>
    </div>
  );
};

export default ScrapedJobsTable; 