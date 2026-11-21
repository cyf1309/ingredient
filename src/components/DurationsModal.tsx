import { useEffect, useState } from 'react';
import { Flame, RotateCcw, X } from 'lucide-react';
import { GARNISH_ITEMS, formatWarmupLabel } from '../data/garnishItems';
import { GarnishIcon } from './GarnishIcon';

interface DurationsModalProps {
  isOpen: boolean;
  customDurations: Record<string, number>;
  customWarmups: Record<string, number>;
  onClose: () => void;
  onSave: (
    nextDurations: Record<string, number>,
    nextWarmups: Record<string, number>
  ) => void;
}

const MINUTE_STEPS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const WARMUP_OPTIONS = [
  { label: 'WU Instantané', sec: 0 },
  { label: 'WU 5m', sec: 5 * 60 },
  { label: 'WU 10m', sec: 10 * 60 },
  { label: 'WU 15m', sec: 15 * 60 },
  { label: 'WU 20m', sec: 20 * 60 },
  { label: 'WU 30m', sec: 30 * 60 },
  { label: 'WU 45m', sec: 45 * 60 },
  { label: 'WU 1h', sec: 60 * 60 },
  { label: 'WU 1h30', sec: 90 * 60 },
  { label: 'WU 2h', sec: 120 * 60 },
  { label: 'WU 3h', sec: 180 * 60 },
  { label: 'WU 4h', sec: 240 * 60 },
];

export function DurationsModal({
  isOpen,
  customDurations,
  customWarmups,
  onClose,
  onSave,
}: DurationsModalProps) {
  const [draft, setDraft] = useState<Record<string, number>>({});
  const [warmupDraft, setWarmupDraft] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, number> = {};
      const initialWarmup: Record<string, number> = {};
      for (const item of GARNISH_ITEMS) {
        initial[item.id] = customDurations[item.id] ?? item.sec;
        initialWarmup[item.id] = customWarmups[item.id] ?? item.warmupSec;
      }
      setDraft(initial);
      setWarmupDraft(initialWarmup);
    }
  }, [customDurations, customWarmups, isOpen]);

  if (!isOpen) return null;

  const updateTime = (id: string, hours: number, minutes: number) => {
    const totalSec = Math.max(300, hours * 3600 + minutes * 60);
    setDraft((prev) => ({ ...prev, [id]: totalSec }));
  };

  const updateWarmup = (id: string, sec: number) => {
    setWarmupDraft((prev) => ({ ...prev, [id]: Math.max(0, sec) }));
  };

  const handleResetDefaults = () => {
    const defaults: Record<string, number> = {};
    const defaultWarmups: Record<string, number> = {};
    for (const item of GARNISH_ITEMS) {
      defaults[item.id] = item.sec;
      defaultWarmups[item.id] = item.warmupSec;
    }
    setDraft(defaults);
    setWarmupDraft(defaultWarmups);
  };

  const handleSave = () => {
    const overrides: Record<string, number> = {};
    const warmupOverrides: Record<string, number> = {};
    for (const item of GARNISH_ITEMS) {
      const val = draft[item.id] ?? item.sec;
      if (val !== item.sec) {
        overrides[item.id] = val;
      }
      const wVal = warmupDraft[item.id] ?? item.warmupSec;
      if (wVal !== item.warmupSec) {
        warmupOverrides[item.id] = wVal;
      }
    }
    onSave(overrides, warmupOverrides);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="durations-modal-title"
    >
      <div className="w-full max-w-xl bg-[#121826] border border-[#263147] rounded-2xl shadow-2xl flex flex-col max-h-[88dvh] overflow-hidden">
        <div className="p-4 border-b border-[#263147] flex items-start justify-between gap-3 shrink-0">
          <div>
            <h2 id="durations-modal-title" className="text-lg font-bold text-slate-50">
              Durées &amp; Warm-up
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ajustez la conservation et le warm-up de chaque bac. Les durées s’appliquent au prochain démarrage.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="min-h-[40px] min-w-[40px] rounded-xl bg-[#1a2234] border border-[#263147] text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#1a2234] px-4">
          {GARNISH_ITEMS.map((item) => {
            const currentSec = draft[item.id] ?? item.sec;
            const currentWarmup = warmupDraft[item.id] ?? item.warmupSec;
            const hours = Math.floor(currentSec / 3600);
            const mins = Math.floor((currentSec % 3600) / 60);
            const isModified =
              currentSec !== item.sec || currentWarmup !== item.warmupSec;

            return (
              <div
                key={item.id}
                className="py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <GarnishIcon itemId={item.id} fallbackEmoji={item.icon} size="sm" />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-100 truncate">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Défaut : {item.dureeTxt} · WU {formatWarmupLabel(item.warmupSec)}
                      {isModified && (
                        <span className="text-sky-400 font-semibold"> · Modifié</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                  <div className="inline-flex items-center gap-1 bg-[#1a2234] border border-[#263147] rounded-lg px-1.5">
                    <Flame
                      className={`w-3.5 h-3.5 shrink-0 ${
                        currentWarmup > 0 ? 'text-orange-400' : 'text-slate-500'
                      }`}
                    />
                    <select
                      aria-label={`Warm-up pour ${item.name}`}
                      value={currentWarmup}
                      onChange={(e) => updateWarmup(item.id, Number(e.target.value))}
                      className="min-h-[38px] bg-transparent text-xs font-mono-tabular font-bold text-orange-200 focus:outline-none"
                    >
                      {WARMUP_OPTIONS.map((opt) => (
                        <option key={opt.sec} value={opt.sec} className="bg-[#121826] text-slate-100">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <select
                    aria-label={`Heures pour ${item.name}`}
                    value={hours}
                    onChange={(e) => updateTime(item.id, Number(e.target.value), mins)}
                    className="min-h-[40px] px-2 rounded-lg bg-[#1a2234] border border-[#263147] text-sm font-mono-tabular font-bold text-slate-100 focus:outline-none focus:border-sky-400"
                  >
                    {Array.from({ length: 25 }, (_, h) => (
                      <option key={h} value={h}>
                        {h}h
                      </option>
                    ))}
                  </select>
                  <select
                    aria-label={`Minutes pour ${item.name}`}
                    value={MINUTE_STEPS.includes(mins) ? mins : Math.round(mins / 5) * 5}
                    onChange={(e) => updateTime(item.id, hours, Number(e.target.value))}
                    className="min-h-[40px] px-2 rounded-lg bg-[#1a2234] border border-[#263147] text-sm font-mono-tabular font-bold text-slate-100 focus:outline-none focus:border-sky-400"
                  >
                    {MINUTE_STEPS.map((m) => (
                      <option key={m} value={m}>
                        {String(m).padStart(2, '0')}m
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-[#263147] flex flex-wrap items-center justify-between gap-2.5 shrink-0 bg-[#090d16]/40">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#1a2234] hover:bg-[#232e45] border border-[#263147] text-xs font-bold text-slate-300 inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1a2234] border border-[#263147] text-sm font-semibold text-slate-200"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
