import { Flame, Play, Square, Zap } from 'lucide-react';
import { BacStatus, ConfirmAction, GarnishItem } from '../types/station';
import { formatClock, formatHMS } from '../data/garnishItems';
import { GarnishIcon } from './GarnishIcon';

interface GarnishCardProps {
  item: GarnishItem;
  status: BacStatus;
  remainingSec: number;
  endTime: number | null;
  confirmPending?: ConfirmAction;
  compact?: boolean;
  onPrimaryClick: (item: GarnishItem) => void;
  onStopClick: (item: GarnishItem) => void;
}

export function GarnishCard({
  item,
  status,
  remainingSec,
  endTime,
  confirmPending,
  compact = false,
  onPrimaryClick,
  onStopClick,
}: GarnishCardProps) {
  const pct =
    status === 'idle'
      ? 0
      : status === 'danger'
      ? 100
      : Math.max(0, Math.min(100, (remainingSec / item.sec) * 100));

  const cardSurface =
    status === 'danger'
      ? 'bg-[#1f1218] border-red-500 card-pulse-danger'
      : status === 'warning'
      ? 'bg-[#121826] border-amber-500 card-pulse-warn'
      : status === 'active'
      ? 'bg-[#121826] border-emerald-500'
      : 'bg-[#121826] border-[#263147]';

  const timerColor =
    status === 'danger'
      ? 'text-red-500'
      : status === 'warning'
      ? 'text-amber-400'
      : status === 'active'
      ? 'text-emerald-400'
      : 'text-slate-500';

  const statusTagStyle =
    status === 'danger'
      ? 'bg-red-500/25 text-red-200'
      : status === 'warning'
      ? 'bg-amber-500/15 text-amber-400'
      : status === 'active'
      ? 'bg-emerald-500/15 text-emerald-400'
      : 'bg-[#1a2234] text-slate-400';

  const statusLabel =
    status === 'danger'
      ? 'Périmé'
      : status === 'warning'
      ? 'Bientôt'
      : status === 'active'
      ? 'En cours'
      : 'Arrêté';

  const progressColor =
    status === 'danger'
      ? 'bg-red-500'
      : status === 'warning'
      ? 'bg-amber-500'
      : status === 'active'
      ? 'bg-emerald-500'
      : 'bg-slate-600';

  const primaryLabel =
    confirmPending === 'start'
      ? 'CONFIRMER ?'
      : status === 'idle'
      ? 'DÉMARRER'
      : status === 'danger'
      ? 'RENOUVELER'
      : 'RECHARGER';

  const primaryBtnStyle =
    confirmPending === 'start'
      ? 'bg-red-600 text-white hover:bg-red-500'
      : status === 'danger'
      ? 'bg-red-600 text-white hover:bg-red-500'
      : status === 'warning'
      ? 'bg-amber-600 text-white hover:bg-amber-500'
      : status === 'active'
      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
      : 'bg-[#273549] text-slate-50 hover:bg-[#31425b]';

  const stopLabel = confirmPending === 'stop' ? 'SÛR ?' : 'PURGER';
  const stopBtnStyle =
    confirmPending === 'stop'
      ? 'bg-red-600 text-white border-red-600'
      : 'bg-[#1a2234] text-slate-300 border-[#263147] hover:text-white hover:border-slate-500';

  const endTextColor =
    status === 'danger'
      ? 'text-red-300'
      : status === 'warning'
      ? 'text-amber-200'
      : status === 'active'
      ? 'text-emerald-300'
      : 'text-slate-400';

  if (compact) {
    const compactSubLabel =
      confirmPending === 'start'
        ? 'Confirmer ?'
        : status === 'danger'
        ? 'Périmé · Tap'
        : status === 'warning'
        ? `Fin ${endTime ? formatClock(endTime, false) : ''}`
        : status === 'active'
        ? `Fin ${endTime ? formatClock(endTime, false) : ''}`
        : 'Appuyer';

    return (
      <article
        className={`relative rounded-xl border-2 p-1 sm:p-2 flex flex-col justify-between gap-0.5 sm:gap-1 transition-colors duration-150 min-w-0 min-h-0 h-full overflow-hidden ${cardSurface}`}
      >
        <div className="flex items-center justify-between gap-1 shrink-0">
          <GarnishIcon
            itemId={item.id}
            fallbackEmoji={item.icon}
            size="xs"
            className="sm:w-7 sm:h-7"
          />

          {status !== 'idle' ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStopClick(item);
              }}
              aria-label={`Purger ${item.name}`}
              title={stopLabel}
              className={`min-w-[24px] h-[22px] px-1 rounded-md text-[10px] font-extrabold border inline-flex items-center justify-center shrink-0 transition-transform active:scale-95 z-10 ${stopBtnStyle}`}
            >
              <Square className="w-2.5 h-2.5 fill-current" />
            </button>
          ) : (
            <span className="inline-flex items-center gap-0.5 font-mono-tabular text-[9.5px] sm:text-[10px] font-bold text-slate-400 leading-none">
              <span>{item.dureeTxt}</span>
              <Play className="w-2.5 h-2.5 fill-current text-sky-400" />
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onPrimaryClick(item)}
          aria-label={`${primaryLabel} ${item.name}`}
          className="flex-1 min-h-0 flex flex-col justify-end text-left gap-0.5 focus-visible:outline-2 focus-visible:outline-sky-400 rounded active:opacity-80 overflow-hidden"
        >
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-100 leading-[1.15] w-full break-words">
            <span title={item.name}>{item.name}</span>
            <span
              className={`inline-flex items-center align-middle gap-0.5 ml-1 px-1 py-[1px] rounded font-mono-tabular text-[8.5px] sm:text-[9px] font-bold leading-none whitespace-nowrap border ${
                item.warmupSec > 0
                  ? 'bg-orange-500/15 border-orange-400/35 text-orange-300'
                  : 'bg-emerald-500/15 border-emerald-400/35 text-emerald-300'
              }`}
              title={`Warm-up : ${item.warmupSec > 0 ? item.warmupTxt : 'Instantané'}`}
            >
              {item.warmupSec > 0 ? (
                <Flame className="w-2 h-2 shrink-0 text-orange-400" />
              ) : (
                <Zap className="w-2 h-2 shrink-0 text-emerald-400" />
              )}
              <span>{item.warmupSec > 0 ? item.warmupTxt : 'Inst.'}</span>
            </span>
          </div>

          <div
            className={`font-mono-tabular text-[11.5px] sm:text-sm font-extrabold leading-none tracking-tight ${
              confirmPending === 'start' ? 'text-red-400' : timerColor
            }`}
          >
            {status === 'danger'
              ? '00:00:00'
              : formatHMS(status === 'idle' ? item.sec : remainingSec)}
          </div>

          <div
            className={`text-[9px] sm:text-[10px] font-mono-tabular font-semibold leading-none truncate w-full ${
              confirmPending === 'start' ? 'text-red-300 font-bold' : endTextColor
            }`}
          >
            {compactSubLabel}
          </div>
        </button>

        <div className="w-full h-1 bg-[#1a2234] rounded-full overflow-hidden shrink-0">
          <div
            className={`h-full rounded-full transition-[width,background-color] duration-500 ease-linear ${progressColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={`rounded-xl border-2 p-2.5 sm:p-3 flex flex-col justify-between gap-2 transition-colors duration-150 min-w-0 overflow-hidden ${cardSurface}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <GarnishIcon itemId={item.id} fallbackEmoji={item.icon} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            <h3
              className="text-sm sm:text-[0.95rem] font-bold text-slate-50 leading-tight truncate tracking-[0.01em]"
              title={item.name}
            >
              {item.name}
            </h3>
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-mono-tabular text-[10px] font-bold leading-none shrink-0 whitespace-nowrap border ${
                item.warmupSec > 0
                  ? 'bg-orange-500/15 border-orange-400/35 text-orange-300'
                  : 'bg-emerald-500/15 border-emerald-400/35 text-emerald-300'
              }`}
              title={`Warm-up : ${item.warmupSec > 0 ? item.warmupTxt : 'Instantané'}`}
            >
              {item.warmupSec > 0 ? (
                <Flame className="w-2.5 h-2.5 shrink-0 text-orange-400" />
              ) : (
                <Zap className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
              )}
              <span>WU {item.warmupSec > 0 ? item.warmupTxt : 'Instantané'}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-400">
            <span className="font-mono-tabular text-slate-300">{item.dureeTxt}</span>
            <span aria-hidden="true">·</span>
            <span className={`font-mono-tabular truncate ${endTextColor}`}>
              {endTime ? `Fin ${formatClock(endTime, false)}` : 'En attente'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className={`font-mono-tabular text-2xl sm:text-[1.55rem] font-extrabold leading-none tracking-tight ${timerColor}`}>
          {status === 'danger' ? '00:00:00' : formatHMS(status === 'idle' ? item.sec : remainingSec)}
        </div>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0 whitespace-nowrap ${statusTagStyle}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="w-full h-1 bg-[#1a2234] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width,background-color] duration-500 ease-linear ${progressColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => onPrimaryClick(item)}
          aria-label={`${primaryLabel} ${item.name}`}
          title={primaryLabel}
          className={`flex-1 min-h-[38px] sm:min-h-[40px] px-2.5 py-1.5 rounded-lg text-xs font-extrabold tracking-wide inline-flex items-center justify-center whitespace-nowrap transition-transform active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${primaryBtnStyle}`}
        >
          {confirmPending === 'start' ? (
            'CONFIRMER ?'
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
        <button
          type="button"
          onClick={() => onStopClick(item)}
          disabled={status === 'idle'}
          aria-label={`Purger ${item.name}`}
          title={stopLabel}
          className={`flex-1 min-h-[38px] sm:min-h-[40px] px-2.5 py-1.5 rounded-lg text-xs font-bold border inline-flex items-center justify-center whitespace-nowrap transition-transform active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${stopBtnStyle}`}
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>
    </article>
  );
}
