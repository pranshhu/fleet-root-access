import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const VideoFeed = ({ robotId }: { robotId: string }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Subscribe to real-time updates for robot status
    const channel = supabase
      .channel('robot-status')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'robots',
          filter: `id=eq.${robotId}`,
        },
        (payload) => {
          console.log('Received status update:', payload);
          setIsOnline(payload.new.status === 'online');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [robotId]);

  return (
    <div className="relative w-full h-full bg-black/50 rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
        {isOnline ? (
          'Camera Feed Active'
        ) : (
          <div className="text-red-500">Camera Offline</div>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;