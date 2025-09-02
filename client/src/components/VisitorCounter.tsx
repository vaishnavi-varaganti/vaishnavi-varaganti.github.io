import { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { FaUsers } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from './ui/badge';

export const VisitorCounter = () => {
  const { isConnected, connectionCount } = useWebSocket();
  const [showConnected, setShowConnected] = useState(false);
  
  // Animate in after connecting
  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        setShowConnected(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {showConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2 bg-card/70 backdrop-blur-sm p-2 px-3 rounded-full border border-primary/30 shadow-lg"
          >
            <FaUsers className="text-primary" />
            <Badge variant="outline" className="bg-primary/10 text-sm flex gap-1 items-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>{connectionCount} {connectionCount === 1 ? 'visitor' : 'visitors'}</span>
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};