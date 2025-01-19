import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface SensorData {
  time: string;
  value: number;
}

const SensorsFeed = ({ robotId }: { robotId: string }) => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    // Initial data fetch
    const fetchInitialData = async () => {
      try {
        const { data: robot, error } = await supabase
          .from('robots')
          .select('temperature')
          .eq('id', robotId)
          .single();

        if (error) {
          console.error('Error fetching robot data:', error);
          return;
        }

        if (robot) {
          const newDataPoint = {
            time: new Date().toLocaleTimeString(),
            value: robot.temperature || 0,
          };
          setSensorData(prev => [...prev, newDataPoint].slice(-10)); // Keep last 10 readings
        }
      } catch (error) {
        console.error('Error in fetchInitialData:', error);
      }
    };

    fetchInitialData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('robot-sensors')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'robots',
          filter: `id=eq.${robotId}`,
        },
        (payload) => {
          console.log('Received sensor update:', payload);
          const newDataPoint = {
            time: new Date().toLocaleTimeString(),
            value: payload.new.temperature || 0,
          };
          setSensorData(prev => [...prev, newDataPoint].slice(-10)); // Keep last 10 readings
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [robotId]);

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