import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { OfflineQueueItem } from '../types';

interface OfflineSyncContextType {
  isOnline: boolean;
  isSimulatedOffline: boolean;
  toggleSimulateOffline: () => void;
  queue: OfflineQueueItem[];
  pendingCount: number;
  enqueueOfflineItem: (type: OfflineQueueItem['type'], title: string, payload: any) => void;
  syncAllPending: () => Promise<void>;
  isSyncing: boolean;
  lastSyncTimestamp: string | null;
  syncNotification: string | null;
  dismissNotification: () => void;
}

const OfflineSyncContext = createContext<OfflineSyncContextType | undefined>(undefined);

const STORAGE_KEY = 'agrolink_offline_queue_v1';
const LAST_SYNC_KEY = 'agrolink_last_sync_timestamp';

export const OfflineSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [browserOnline, setBrowserOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [queue, setQueue] = useState<OfflineQueueItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LAST_SYNC_KEY) || null;
    } catch {
      return null;
    }
  });
  const [syncNotification, setSyncNotification] = useState<string | null>(null);

  const isOnline = browserOnline && !isSimulatedOffline;
  const pendingCount = queue.filter((q) => q.status === 'PENDING').length;

  // Listen to browser network state
  useEffect(() => {
    const handleOnline = () => setBrowserOnline(true);
    const handleOffline = () => setBrowserOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save queue to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.warn('Failed to persist offline queue to localStorage', e);
    }
  }, [queue]);

  const toggleSimulateOffline = () => {
    setIsSimulatedOffline((prev) => !prev);
  };

  const dismissNotification = () => {
    setSyncNotification(null);
  };

  // Sync all pending items
  const syncAllPending = useCallback(async () => {
    const pendingItems = queue.filter((i) => i.status === 'PENDING');
    if (pendingItems.length === 0 || !isOnline) return;

    setIsSyncing(true);
    // Simulate real network synchronization latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    setQueue((prev) =>
      prev.map((item) => ({ ...item, status: 'SYNCED' }))
    );

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSyncTimestamp(now);
    try {
      localStorage.setItem(LAST_SYNC_KEY, now);
    } catch {}

    setSyncNotification(
      `Connectivity restored! Successfully synchronized ${pendingItems.length} queued item${pendingItems.length > 1 ? 's' : ''} to Agrolink Africa cloud servers.`
    );
    setIsSyncing(false);
  }, [queue, isOnline]);

  // Auto-trigger sync when transitioning to online
  useEffect(() => {
    if (isOnline && pendingCount > 0) {
      syncAllPending();
    }
  }, [isOnline, pendingCount, syncAllPending]);

  // Enqueue new item
  const enqueueOfflineItem = (type: OfflineQueueItem['type'], title: string, payload: any) => {
    const newItem: OfflineQueueItem = {
      id: `OFFLINE-TX-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      type,
      title,
      payload,
      queuedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: isOnline ? 'SYNCED' : 'PENDING',
    };

    setQueue((prev) => [newItem, ...prev]);

    if (!isOnline) {
      setSyncNotification(
        `Working offline: "${title}" saved securely to device storage. Will auto-sync when network returns.`
      );
    } else {
      setSyncNotification(`"${title}" submitted and verified on Agrolink network.`);
    }
  };

  return (
    <OfflineSyncContext.Provider
      value={{
        isOnline,
        isSimulatedOffline,
        toggleSimulateOffline,
        queue,
        pendingCount,
        enqueueOfflineItem,
        syncAllPending,
        isSyncing,
        lastSyncTimestamp,
        syncNotification,
        dismissNotification,
      }}
    >
      {children}
    </OfflineSyncContext.Provider>
  );
};

export const useOfflineSync = () => {
  const context = useContext(OfflineSyncContext);
  if (!context) {
    throw new Error('useOfflineSync must be used within an OfflineSyncProvider');
  }
  return context;
};
