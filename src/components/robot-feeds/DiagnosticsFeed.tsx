import React from 'react';
import { Terminal } from 'lucide-react';

const DiagnosticsFeed = () => {
  return (
    <div className="w-full h-full bg-black/50 rounded-lg p-4 font-mono text-sm text-muted-foreground overflow-auto">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-4 h-4" />
        <span>System Diagnostics</span>
      </div>
      <div className="space-y-2">
        <div>[INFO] System initialized</div>
        <div>[INFO] All sensors operational</div>
        <div>[WARN] Battery at 87%</div>
        <div>[INFO] Navigation system online</div>
        <div>[INFO] Connection stable: 24ms latency</div>
      </div>
    </div>
  );
};

export default DiagnosticsFeed;