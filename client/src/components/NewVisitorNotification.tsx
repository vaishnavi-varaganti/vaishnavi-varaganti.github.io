import { useEffect, useState } from 'react';
import { useWebSocket, WebSocketMessage } from '@/hooks/useWebSocket';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { IoPersonAdd } from 'react-icons/io5';

export const NewVisitorNotification = () => {
  const { lastMessage, connectionCount } = useWebSocket();
  const [prevCount, setPrevCount] = useState(0);
  
  // Show notification when someone new connects
  useEffect(() => {
    // Only trigger if we've already been connected (prevCount > 0)
    // and the count has increased
    if (prevCount > 0 && connectionCount > prevCount) {
      // Someone new joined
      toast({
        title: 'New Visitor',
        description: `Someone new is checking out your portfolio! Total visitors: ${connectionCount}`,
        variant: 'default',
        className: 'bg-primary/10 border-primary',
        action: (
          <div className="bg-primary/20 p-2 rounded-full">
            <IoPersonAdd className="h-4 w-4 text-primary" />
          </div>
        ),
      });
    }
    
    // Update previous count
    setPrevCount(connectionCount);
  }, [connectionCount, prevCount]);
  
  return null; // This component doesn't render anything
};