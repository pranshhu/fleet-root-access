import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface SensorData {
  time: string;
  value: number;
}

const SensorsFeed = ({ robotId }: { robotId: string }) => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    // Generate dummy data
    const generateDummyData = () => {
      const data: SensorData[] = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          time: new Date(Date.now() - (9 - i) * 1000).toLocaleTimeString(),
          value: Math.floor(Math.random() * 30) + 20, // Random temperature between 20-50
        });
      }
      setSensorData(data);
    };

    generateDummyData();

    // Update dummy data every 2 seconds
    const interval = setInterval(generateDummyData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-black/50 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sensorData}>
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