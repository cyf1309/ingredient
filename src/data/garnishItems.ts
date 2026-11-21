import { GarnishItem } from '../types/station';

export const GARNISH_ITEMS: GarnishItem[] = [
  { id: 'bacon', name: 'Bacon', icon: '🥓', dureeTxt: '8h', sec: 8 * 3600, warmupTxt: '1h', warmupSec: 3600 },
  { id: 'cornichons', name: 'Cornichons', icon: '🥒', dureeTxt: '24h', sec: 24 * 3600, warmupTxt: '1h', warmupSec: 3600 },
  { id: 'fromage', name: 'Fromage', icon: '🧀', dureeTxt: '2h', sec: 2 * 3600, warmupTxt: '1h', warmupSec: 3600 },
  { id: 'oignon_cara', name: 'Oignons Caramélisés', icon: '🍯', dureeTxt: '2h', sec: 2 * 3600, warmupTxt: '1h', warmupSec: 3600 },
  { id: 'oignon_frais', name: 'Oignons Frais', icon: '🧅', dureeTxt: '2h', sec: 2 * 3600, warmupTxt: '1h', warmupSec: 3600 },
  { id: 'oignon_frit', name: 'Oignons Frits', icon: '🧅', dureeTxt: '12h', sec: 12 * 3600, warmupTxt: 'Instantané', warmupSec: 0 },
  { id: 'raclette_f', name: 'Raclette Fumée', icon: '🧀', dureeTxt: '2h', sec: 2 * 3600, warmupTxt: '1h', warmupSec: 3600 },
  { id: 'raclette_p', name: 'Raclette Poivre', icon: '🫕', dureeTxt: '2h', sec: 2 * 3600, warmupTxt: '1h', warmupSec: 3600 },
  { id: 'iceberg', name: 'Salade Iceberg', icon: '🥬', dureeTxt: '2h', sec: 2 * 3600, warmupTxt: '1h', warmupSec: 3600 },
  { id: 'sauce_frites', name: 'Sauce King Fries', icon: '🍟', dureeTxt: '6h', sec: 6 * 3600, warmupTxt: '2h', warmupSec: 2 * 3600 },
  { id: 'tomate', name: 'Tomate', icon: '🍅', dureeTxt: '2h', sec: 2 * 3600, warmupTxt: '1h', warmupSec: 3600 },
];

export const STORAGE_PREFIX = 'time_app_';
export const SORT_STORAGE_KEY = 'time_app_sort_urgency';
export const DURATIONS_STORAGE_KEY = 'time_app_custom_durations';
export const WARMUPS_STORAGE_KEY = 'time_app_custom_warmups';
export const LOGS_STORAGE_KEY = 'time_app_shift_logs';
export const CHAT_STORAGE_KEY = 'time_app_chat_history';
export const WARN_THRESHOLD_SEC = 300; // 5 minutes
export const ALARM_REPEAT_MS = 8000; // Rappel sonore toutes les 8s si périmé

export function formatDurationLabel(totalSeconds: number): string {
  const safe = Math.max(60, Math.round(totalSeconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h${String(m).padStart(2, '0')}`;
}

export function formatWarmupLabel(totalSeconds: number): string {
  if (totalSeconds <= 0) return 'Instantané';
  return formatDurationLabel(totalSeconds);
}

export function formatHMS(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatClock(timestamp: number, withSeconds: boolean): string {
  const d = new Date(timestamp);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  if (!withSeconds) return `${h}:${m}`;
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}
