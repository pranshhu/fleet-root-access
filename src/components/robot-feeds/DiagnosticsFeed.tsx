import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DiagnosticLog {
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const DiagnosticsFeed = ({ robotId }: { robotId: string }) => {
  const [logs, setLogs] = useState<DiagnosticLog[]>([]);

  useEffect(() => {
    // Subscribe to real-time updates
    const channel = supabase
      .channel('robot-diagnostics')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes
          schema: 'public',
          table: 'robots',
          filter: `id=eq.${robotId}`,
        },
        (payload) => {
          console.log('Received diagnostic update:', payload);
          const newLog: DiagnosticLog = {
            timestamp: new Date().toLocaleTimeString(),
            type: 'INFO',
            message: `Status: ${payload.new.status}, CPU: ${payload.new.cpu_usage}%, RAM: ${payload.new.ram_usage}%`,
          };
          setLogs(prev => [newLog, ...prev].slice(0, 5)); // Keep last 5 logs
        }
      )
      .subscribe();

    // Add initial diagnostic log
    setLogs([{
      timestamp: new Date().toLocaleTimeString(),
      type: 'INFO',
      message: 'System initialized',
    }]);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [robotId]);

  return (
    <div className="w-full h-full bg-black/50 rounded-lg p-4 font-mono text-sm text-muted-foreground overflow-auto">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-4 h-4" />
        <span>System Diagnostics</span>
      </div>
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div key={index} className={`
            ${log.type === 'WARN' ? 'text-yellow-500' : ''}
            ${log.type === 'ERROR' ? 'text-red-500' : ''}
          `}>
            [{log.type}] {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticsFeed;