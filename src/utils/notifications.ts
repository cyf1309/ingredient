export type NotificationState = 'granted' | 'denied' | 'default' | 'unsupported';

export function getNotificationState(): NotificationState {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export async function requestAndroidNotificationPermission(): Promise<NotificationState> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  if (Notification.permission === 'denied') {
    return 'denied';
  }
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch {
    return Notification.permission;
  }
}

export async function sendBacNotification(params: {
  title: string;
  body: string;
  tag: string;
  urgent?: boolean;
}): Promise<void> {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const options: NotificationOptions & { renotify?: boolean; vibrate?: number[] } = {
    body: params.body,
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    tag: params.tag,
    renotify: true,
    requireInteraction: Boolean(params.urgent),
    vibrate: params.urgent ? [220, 100, 220] : [120],
  };

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && typeof reg.showNotification === 'function') {
        await reg.showNotification(params.title, options);
        return;
      }
    }
    new Notification(params.title, options);
  } catch {
    // Ignore notification delivery errors on restricted environments
  }
}
