import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [backups, setBackups] = useState([]);

  useEffect(() => {
    const fetchBackups = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await axios.get('http://localhost:3001/api/backups', {
        headers: { Authorization: token ? `${token}`:'', },
      });
      setBackups(res.data);
    };

    fetchBackups();
  }, []);
console.log(backups[0]);
  
  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Your Backups</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {backups.map((backup) => (
            <tr key={backup.id}>
              <td className="border px-4 py-2">{backup.backup_name}</td>
              <td className="border px-4 py-2">{backup.created_at}</td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
