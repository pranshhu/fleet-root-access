import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

interface DiagnosticLog {
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const DiagnosticsFeed = ({ robotId }: { robotId: string }) => {
  const [logs, setLogs] = useState<DiagnosticLog[]>([]);

  useEffect(() => {
    // Generate initial dummy logs
    const initialLogs: DiagnosticLog[] = [
      {
        timestamp: new Date().toLocaleTimeString(),
        type: 'INFO',
        message: 'System initialized',
      },
      {
        timestamp: new Date(Date.now() - 5000).toLocaleTimeString(),
        type: 'INFO',
        message: 'Status: Online, CPU: 45%, RAM: 32%',
      },
      {
        timestamp: new Date(Date.now() - 10000).toLocaleTimeString(),
        type: 'WARN',
        message: 'CPU usage above 40%',
      }
    ];
    
    setLogs(initialLogs);

    // Add new dummy log every 3 seconds
    const interval = setInterval(() => {
      const types: DiagnosticLog['type'][] = ['INFO', 'WARN', 'ERROR'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const cpuUsage = Math.floor(Math.random() * 100);
      const ramUsage = Math.floor(Math.random() * 100);
      
      const newLog: DiagnosticLog = {
        timestamp: new Date().toLocaleTimeString(),
        type: randomType,
        message: `Status: Online, CPU: ${cpuUsage}%, RAM: ${ramUsage}%`,
      };
      
      setLogs(prev => [newLog, ...prev].slice(0, 5)); // Keep last 5 logs
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
            [{log.timestamp}] [{log.type}] {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticsFeed;