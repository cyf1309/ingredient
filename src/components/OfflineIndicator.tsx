import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="bg-amber-500/15 border border-amber-500/40 rounded-xl px-3.5 py-2 text-xs font-semibold text-amber-200 flex items-center gap-2"
    >
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>Mode hors ligne — Les 12 chronos et le journal restent 100 % actifs.</span>
    </div>
  );
}
