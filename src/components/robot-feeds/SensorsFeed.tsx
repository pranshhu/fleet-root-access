import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '00:00', value: 65 },
  { time: '00:01', value: 68 },
  { time: '00:02', value: 71 },
  { time: '00:03', value: 69 },
  { time: '00:04', value: 72 },
  { time: '00:05', value: 70 },
];

const SensorsFeed = () => {
  return (
    <div className="w-full h-full bg-black/50 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#666" />
          <YAxis stroke="#666" />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#2563eb" 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorsFeed;