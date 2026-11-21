import React, { useId } from 'react';

interface GarnishIconProps {
  itemId: string;
  fallbackEmoji?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<GarnishIconProps['size']>, string> = {
  xs: 'w-6 h-6 rounded-md p-0.5',
  sm: 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg p-0.5',
  md: 'w-9 h-9 rounded-xl p-1',
  lg: 'w-10 h-10 rounded-xl p-1',
};

const BADGE_STYLES: Record<string, string> = {
  tomate: 'bg-red-500/15 border-red-500/30',
  fromage: 'bg-amber-500/15 border-amber-400/35',
  raclette_p: 'bg-yellow-500/15 border-yellow-400/30',
  raclette_f: 'bg-amber-600/20 border-orange-400/35',
  raclette_a: 'bg-violet-400/15 border-violet-300/30',
  iceberg: 'bg-emerald-500/15 border-emerald-400/30',
  bacon: 'bg-rose-500/15 border-rose-400/30',
  bacon_pep: 'bg-orange-500/15 border-orange-400/30',
  oignon_frais: 'bg-fuchsia-500/15 border-fuchsia-400/30',
  oignon_frit: 'bg-amber-500/15 border-amber-400/30',
  oignon_cara: 'bg-orange-600/20 border-amber-500/35',
  sauce_frites: 'bg-yellow-400/15 border-yellow-300/30',
  sauce_raclette: 'bg-amber-400/15 border-amber-300/30',
  cornichons: 'bg-lime-500/15 border-lime-400/30',
};

function renderVectorGraphic(itemId: string, gradId: string): React.ReactNode | null {
  switch (itemId) {
    case 'tomate':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <defs>
            <radialGradient id={gradId} cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FF6B5B" />
              <stop offset="65%" stopColor="#E12D20" />
              <stop offset="100%" stopColor="#991B1B" />
            </radialGradient>
          </defs>
          {/* Tranche / tomate fraîche */}
          <circle cx="24" cy="26" r="16.5" fill={`url(#${gradId})`} stroke="#FCA5A5" strokeOpacity="0.45" strokeWidth="1.2" />
          {/* Quartiers intérieurs stylisés */}
          <circle cx="24" cy="26" r="12" fill="#EF4444" opacity="0.65" />
          <path d="M24 15.5 C21 19, 17 22, 14 25 C17.5 27, 21 26.5, 24 26 Z" fill="#B91C1C" opacity="0.6" />
          <path d="M24 15.5 C27 19, 31 22, 34 25 C30.5 27, 27 26.5, 24 26 Z" fill="#B91C1C" opacity="0.6" />
          <path d="M15 29 C18 33, 21 35, 24 36 C24 31, 22 28, 15 29 Z" fill="#B91C1C" opacity="0.55" />
          <path d="M33 29 C30 33, 27 35, 24 36 C24 31, 26 28, 33 29 Z" fill="#B91C1C" opacity="0.55" />
          {/* Pépins dorés */}
          <ellipse cx="19" cy="22.5" rx="1.1" ry="1.8" transform="rotate(-25 19 22.5)" fill="#FDE047" />
          <ellipse cx="29" cy="22.5" rx="1.1" ry="1.8" transform="rotate(25 29 22.5)" fill="#FDE047" />
          <ellipse cx="19.5" cy="31" rx="1.1" ry="1.8" transform="rotate(25 19.5 31)" fill="#FDE047" />
          <ellipse cx="28.5" cy="31" rx="1.1" ry="1.8" transform="rotate(-25 28.5 31)" fill="#FDE047" />
          {/* Feuille verte */}
          <path d="M24 12 C21 8, 16 9, 17 12.5 C19 12, 22 12.5, 24 14 C26 12.5, 29 12, 31 12.5 C32 9, 27 8, 24 12 Z" fill="#22C55E" />
          <path d="M24 7 L24 13" stroke="#15803D" strokeWidth="2.4" strokeLinecap="round" />
          {/* Reflet */}
          <ellipse cx="18" cy="19" rx="3" ry="1.5" transform="rotate(-30 18 19)" fill="#FFFFFF" opacity="0.35" />
        </svg>
      );

    case 'fromage':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Tranche arrière */}
          <rect x="9" y="10" width="24" height="24" rx="3" transform="rotate(-8 21 22)" fill="#D97706" stroke="#FDE68A" strokeOpacity="0.4" strokeWidth="1" />
          {/* Tranche avant cheddar fondu */}
          <rect x="13" y="14" width="25" height="24" rx="3.5" transform="rotate(6 25.5 26)" fill="#FBBF24" stroke="#FEF3C7" strokeOpacity="0.7" strokeWidth="1.2" />
          {/* Coin fondant */}
          <path d="M15 17 L35 19 L34 23 C31 24, 29 27, 27 25 C24 23, 21 26, 15 22 Z" fill="#FDE047" opacity="0.55" />
          {/* Petite brillance */}
          <line x1="17" y1="18" x2="29" y2="19.2" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
        </svg>
      );

    case 'raclette_p':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Base croûte raclette */}
          <path d="M8 31 L39 24 L37 35 C27 38, 17 38, 9 35 Z" fill="#B45309" />
          {/* Tranche crémeuse */}
          <path d="M7 28 C12 16, 25 11, 38 15 L40 26 C29 31, 17 32, 7 28 Z" fill="#FDE68A" stroke="#FEF9C3" strokeWidth="1.2" />
          {/* Coulée fondue */}
          <path d="M14 29 C14 34, 18 35, 19 30 C22 33, 25 32, 26 28 Z" fill="#FCD34D" />
          {/* Grains de poivre noir concassé */}
          <circle cx="17" cy="22" r="1.8" fill="#1E293B" />
          <circle cx="24" cy="19" r="2.1" fill="#0F172A" />
          <circle cx="31" cy="21" r="1.7" fill="#1E293B" />
          <circle cx="21" cy="25" r="1.4" fill="#334155" />
          <circle cx="28" cy="25" r="1.9" fill="#0F172A" />
          <circle cx="14" cy="24" r="1.2" fill="#334155" />
          <circle cx="34" cy="18" r="1.3" fill="#1E293B" />
        </svg>
      );

    case 'raclette_f':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Volutes de fumée douce */}
          <path
            d="M17 15 C15 12, 19 10, 17 7"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M24 14 C22 11, 26 9, 24 6"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M31 15 C29 12, 33 10, 31 7"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Croûte fumée ambrée */}
          <path d="M8 32 L39 25 L37 36 C27 39, 17 39, 9 36 Z" fill="#9A3412" />
          {/* Tranche de raclette fumée dorée */}
          <path
            d="M7 29 C12 18, 25 14, 38 18 L40 27 C29 32, 17 33, 7 29 Z"
            fill="#FCD34D"
            stroke="#C2410C"
            strokeWidth="1.3"
          />
          {/* Bord fumé brun doré */}
          <path
            d="M9 21 C16 17, 27 16, 37 19"
            fill="none"
            stroke="#B45309"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Coulée fondue */}
          <path d="M15 30 C15 35, 19 36, 20 31 C23 34, 26 33, 27 29 Z" fill="#FBBF24" />
        </svg>
      );

    case 'raclette_a':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Tranche raclette douce */}
          <path d="M6 29 C10 18, 22 14, 34 17 L35 28 C25 33, 14 33, 6 29 Z" fill="#FEF08A" stroke="#FEF9C3" strokeWidth="1.2" />
          <path d="M7 30 L34 27 L33 34 C24 37, 14 37, 8 34 Z" fill="#D97706" />
          {/* Herbes fines */}
          <circle cx="14" cy="23" r="1.1" fill="#16A34A" />
          <circle cx="21" cy="20" r="1" fill="#15803D" />
          <circle cx="18" cy="26" r="1.1" fill="#22C55E" />
          {/* Gousse d'ail au premier plan */}
          <path
            d="M33 15 C34 20, 41 23, 41 30 C41 35, 36.5 38, 32 38 C27.5 38, 24 35, 24 30 C24 24, 30 20, 31.5 14.5 C32 13, 33 13.5, 33 15 Z"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />
          <path d="M32 17 C30 23, 29 30, 31 37" fill="none" stroke="#DDD6FE" strokeWidth="1.4" />
          <path d="M33 17 C35 23, 36 30, 34 37" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
        </svg>
      );

    case 'iceberg':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Feuilles externes */}
          <path d="M24 8 C14 8, 8 15, 9 25 C9 34, 16 40, 24 40 C32 40, 39 34, 39 25 C40 15, 34 8, 24 8 Z" fill="#16A34A" />
          {/* Feuilles intermédiaires */}
          <path d="M12 22 C13 13, 21 10, 29 13 C35 15, 38 22, 36 30 C33 36, 26 38, 19 36 C13 34, 11 28, 12 22 Z" fill="#4ADE80" />
          {/* Cœur croquant */}
          <path d="M16 25 C17 17, 25 14, 31 18 C35 22, 34 31, 27 34 C21 36, 15 31, 16 25 Z" fill="#86EFAC" />
          {/* Nervures blanches/vert clair */}
          <path d="M24 38 C23 30, 21 24, 17 19" fill="none" stroke="#ECFDF5" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
          <path d="M24 38 C26 30, 28 24, 32 20" fill="none" stroke="#ECFDF5" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
          <path d="M24 38 L24 21" fill="none" stroke="#DCFCE7" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        </svg>
      );

    case 'bacon':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Tranche 1 (haut) */}
          <path
            d="M7 18 C13 11, 20 21, 27 14 C33 9, 38 14, 41 11 L43 18 C38 22, 33 17, 27 22 C20 28, 13 19, 8 25 Z"
            fill="#DC2626"
            stroke="#991B1B"
            strokeWidth="1"
          />
          <path
            d="M8.5 21 C14 15, 20.5 24, 27 18 C33 13, 38 17.5, 41.5 14.5"
            fill="none"
            stroke="#FDBA74"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Tranche 2 (bas) */}
          <path
            d="M5 32 C11 25, 18 35, 25 28 C31 23, 36 28, 40 25 L42 32 C37 36, 31 31, 25 36 C18 42, 11 33, 6 39 Z"
            fill="#B91C1C"
            stroke="#7F1D1D"
            strokeWidth="1"
          />
          <path
            d="M6.5 35 C12 29, 18.5 38, 25 32 C31 27, 36 31.5, 40.5 28.5"
            fill="none"
            stroke="#FED7AA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'bacon_pep':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Coupelle inox */}
          <path d="M9 28 L39 28 L35 39 C34 40.5, 32 41, 24 41 C16 41, 14 40.5, 13 39 Z" fill="#475569" stroke="#94A3B8" strokeWidth="1.2" />
          <ellipse cx="24" cy="28" rx="15" ry="4" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
          {/* Tas de pépites de bacon grillées */}
          <rect x="13" y="21" width="6" height="5" rx="1.2" transform="rotate(-14 16 23.5)" fill="#DC2626" />
          <rect x="20" y="19" width="6.5" height="5.5" rx="1.2" transform="rotate(10 23 22)" fill="#991B1B" />
          <rect x="27" y="21" width="6" height="5" rx="1.2" transform="rotate(20 30 23.5)" fill="#EA580C" />
          <rect x="17" y="14" width="5.5" height="5" rx="1.2" transform="rotate(18 19.5 16.5)" fill="#EF4444" />
          <rect x="24" y="13" width="6" height="5" rx="1.2" transform="rotate(-12 27 15.5)" fill="#B91C1C" />
          <rect x="11" y="24" width="5" height="4.5" rx="1" transform="rotate(8 13.5 26)" fill="#F97316" />
          <rect x="31" y="24" width="5" height="4.5" rx="1" transform="rotate(-18 33.5 26)" fill="#DC2626" />
          {/* Touches gras doré */}
          <circle cx="19" cy="16" r="1.1" fill="#FED7AA" />
          <circle cx="28" cy="22" r="1.2" fill="#FDBA74" />
          <circle cx="23" cy="21" r="1" fill="#FED7AA" />
        </svg>
      );

    case 'oignon_frais':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Rondelle d'oignon rouge/frais arrière */}
          <circle cx="20" cy="22" r="11" fill="none" stroke="#C026D3" strokeWidth="3.2" />
          <circle cx="20" cy="22" r="8" fill="none" stroke="#FAF5FF" strokeWidth="2.5" />
          <circle cx="20" cy="22" r="5" fill="none" stroke="#E879F9" strokeWidth="1.6" />
          {/* Rondelle avant nette */}
          <circle cx="29" cy="27" r="11.5" fill="#1E1B4B" fillOpacity="0.35" stroke="#A21CAF" strokeWidth="3.4" />
          <circle cx="29" cy="27" r="8.2" fill="none" stroke="#FFFFFF" strokeWidth="2.6" />
          <circle cx="29" cy="27" r="5" fill="none" stroke="#F0ABFC" strokeWidth="1.8" />
        </svg>
      );

    case 'oignon_frit':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Croustillants oignons frits dorés */}
          <path d="M10 31 C11 22, 19 20, 26 23 C33 25, 39 29, 37 34 C32 37, 17 37, 10 31 Z" fill="#B45309" />
          <path d="M12 29 C13 21, 18 17, 25 19 C30 21, 35 25, 34 30" fill="none" stroke="#F59E0B" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M15 22 C19 15, 28 14, 33 20" fill="none" stroke="#FBBF24" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M13 32 C19 28, 29 29, 36 33" fill="none" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 17 C22 12, 27 13, 30 16" fill="none" stroke="#F59E0B" strokeWidth="3.2" strokeLinecap="round" />
          {/* Miettes dorées croustillantes */}
          <circle cx="15" cy="27" r="1.4" fill="#FEF08A" />
          <circle cx="24" cy="24" r="1.5" fill="#FDE047" />
          <circle cx="31" cy="26" r="1.3" fill="#FEF08A" />
          <circle cx="21" cy="31" r="1.4" fill="#FCD34D" />
        </svg>
      );

    case 'oignon_cara':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Fond confit ambré */}
          <ellipse cx="24" cy="30" rx="16" ry="9.5" fill="#78350F" stroke="#B45309" strokeWidth="1.4" />
          {/* Lamelles fondantes caramélisées */}
          <path d="M12 29 C15 21, 24 19, 34 25" fill="none" stroke="#D97706" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M14 33 C20 26, 29 25, 36 31" fill="none" stroke="#B45309" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M16 24 C21 16, 30 16, 33 23" fill="none" stroke="#F59E0B" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M18 30 C23 24, 29 24, 33 29" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
          {/* Reflet brillant caramélisé */}
          <path d="M20 20 C23 18.5, 26 18.5, 29 20" fill="none" stroke="#FEF3C7" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'sauce_frites':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* 2 frites dorées trempées */}
          <rect x="27" y="7" width="4.5" height="17" rx="1.4" transform="rotate(14 29 15)" fill="#FBBF24" stroke="#D97706" strokeWidth="0.9" />
          <rect x="21" y="9" width="4.5" height="16" rx="1.4" transform="rotate(-10 23 17)" fill="#FDE047" stroke="#D97706" strokeWidth="0.9" />
          {/* Pot / ramequin sauce frites */}
          <path d="M10 23 L38 23 L34 39 C33.5 40.5, 31.5 41, 24 41 C16.5 41, 14.5 40.5, 14 39 Z" fill="#DC2626" stroke="#FCA5A5" strokeOpacity="0.4" strokeWidth="1.1" />
          {/* Sauce crémeuse onctueuse sur le dessus */}
          <ellipse cx="24" cy="23" rx="14" ry="4.5" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1" />
          <path d="M16 23 C19 20, 29 20, 32 23" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          {/* Étiquette */}
          <rect x="17" y="29" width="14" height="6" rx="2" fill="#FEF08A" opacity="0.9" />
        </svg>
      );

    case 'sauce_raclette':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Flacon / verseuse sauce chaude */}
          <path d="M10 22 L37 22 L34 38 C33 40, 30 41, 23.5 41 C17 41, 14 40, 13 38 Z" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.4" />
          {/* Sauce fromage onctueuse qui déborde */}
          <ellipse cx="23.5" cy="22" rx="13.5" ry="4.5" fill="#FDE047" />
          <path d="M13 23 C13 29, 17 30, 18 25 C20 29, 23 28, 24 24 C27 29, 30 28, 31 24 L35 23" fill="#FACC15" />
          {/* Goutte tombant */}
          <path d="M24 9 C24 9, 29 14, 29 17 C29 19.5, 26.8 21, 24 21 C21.2 21, 19 19.5, 19 17 C19 14, 24 9, 24 9 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
          {/* Grains poivre/épices dans la sauce */}
          <circle cx="18" cy="22" r="1" fill="#78350F" />
          <circle cx="28" cy="21" r="1" fill="#78350F" />
          <circle cx="24" cy="17.5" r="0.9" fill="#92400E" />
        </svg>
      );

    case 'cornichons':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          {/* Rondelle arrière */}
          <circle cx="18" cy="19" r="10.5" fill="#15803D" stroke="#4ADE80" strokeWidth="1.6" strokeDasharray="2.5 1.8" />
          <circle cx="18" cy="19" r="7.5" fill="#86EFAC" />
          <circle cx="15.5" cy="17.5" r="1" fill="#DCFCE7" />
          <circle cx="20.5" cy="18" r="1" fill="#DCFCE7" />
          <circle cx="18" cy="21.5" r="1" fill="#DCFCE7" />

          {/* Rondelle droite */}
          <circle cx="31" cy="23" r="10.5" fill="#166534" stroke="#4ADE80" strokeWidth="1.6" strokeDasharray="2.5 1.8" />
          <circle cx="31" cy="23" r="7.5" fill="#A7F3D0" />
          <circle cx="28.5" cy="21.5" r="1" fill="#ECFDF5" />
          <circle cx="33.5" cy="22" r="1" fill="#ECFDF5" />
          <circle cx="31" cy="25.5" r="1" fill="#ECFDF5" />

          {/* Rondelle avant principale */}
          <circle cx="23" cy="31" r="11" fill="#15803D" stroke="#84CC16" strokeWidth="2" strokeDasharray="3 1.8" />
          <circle cx="23" cy="31" r="8" fill="#BBF7D0" />
          <circle cx="23" cy="31" r="3" fill="#86EFAC" opacity="0.65" />
          {/* Pépins */}
          <ellipse cx="20" cy="29" rx="1.2" ry="0.8" transform="rotate(-30 20 29)" fill="#FEF9C3" />
          <ellipse cx="26" cy="29" rx="1.2" ry="0.8" transform="rotate(30 26 29)" fill="#FEF9C3" />
          <ellipse cx="20.5" cy="33.5" rx="1.2" ry="0.8" transform="rotate(30 20.5 33.5)" fill="#FEF9C3" />
          <ellipse cx="25.5" cy="33.5" rx="1.2" ry="0.8" transform="rotate(-30 25.5 33.5)" fill="#FEF9C3" />
        </svg>
      );

    default:
      return null;
  }
}

export function GarnishIcon({
  itemId,
  fallbackEmoji = '🍽️',
  size = 'md',
  className = '',
}: GarnishIconProps) {
  const gradId = useId();
  const vector = renderVectorGraphic(itemId, gradId);
  const badgeStyle = BADGE_STYLES[itemId] ?? 'bg-[#1a2234] border-[#263147]';

  return (
    <span
      className={`inline-flex items-center justify-center border shrink-0 select-none ${SIZE_CLASSES[size]} ${badgeStyle} ${className}`}
      aria-hidden="true"
    >
      {vector ?? <span className="leading-none">{fallbackEmoji}</span>}
    </span>
  );
}
